"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
} from "@nextui-org/react";
import { useAccount, useWriteContract, useChainId } from "wagmi";
import { useSnackbar } from "notistack";
import { useTradeState } from "@/tizz-trade-hooks/useTradeState";
import { useTradingVariables } from "@/tizz-trade-hooks/useTradingVariables";

import { twMerge } from "tailwind-merge";
import { Fee, Pair } from "@gainsnetwork/sdk";
import { Address } from "viem";
import { useTranslations } from "next-intl";
import { TradeContainer } from "@/types/index";

import PairIcon from "@/components/icons/PairIcon";
import { getPercentageStr, getPriceStr } from "@/utils/price";
import {
  tizzContractAddresses,
  CollateralTypes,
  collateralPairIds,
} from "@/utils/tizz";
import { TizzTradingAbi } from "@/abis/Tizz/TizzTrading";
import { getBytesProof } from "../../../../../_actions/getProof";
import {
  calcGainedBaseAsset,
  calcGainedBaseAssetPercentage,
} from "@/utils/index";

import { useGetFees } from "@/tizz-trade-hooks/useGetFees";
import { usePendingTransactionToast } from "@/tizz-trade-hooks/usePendingTransactionToast";

export type CloseTradeModalProps = {
  tradeContainer: TradeContainer & {
    collateralType: CollateralTypes;
    collateralPriceUsd: number;
    collateralPrecision: number;
    pair: Pair;
    fee: Fee;
  };
  currentPrice: number;
  isOpen: boolean;
  onClose(): void;
  onOpenChange(): void;
  onConnectorModalOpenChange(value: boolean): void;
};

export default function CloseTradeModal({
  tradeContainer,
  currentPrice,
  isOpen,
  onClose,
  onOpenChange,
  onConnectorModalOpenChange,
}: CloseTradeModalProps) {
  const t = useTranslations("Trade-CloseTradeModal");
  const { enqueueSnackbar } = useSnackbar();
  const { setPendingTransactionHash } = usePendingTransactionToast();

  const account = useAccount();
  const { writeContract } = useWriteContract();
  const chainId = useChainId();
  const { tradeState } = useTradeState();
  const tradingVariable = useTradingVariables(
    chainId,
    tradeState.collateralType,
  );

  const {
    trade,
    tradeInfo,
    collateralPriceUsd,
    collateralType,
    collateralPrecision,
    pair,
    fee,
  } = tradeContainer;

  const { tradeFundingFee, closeFee } = useGetFees({
    input: {
      trader: trade.trader as Address,
      pairIndex: trade.pairIndex,
      index: trade.index,
      long: trade.buy,
      leverage: trade.leverage,
      positionBaseAsset: Math.floor(
        (tradeInfo.openInterestBaseAsset * collateralPrecision) /
          trade.leverage,
      ),
      fee,
    },
    collateralType,
  });

  const handleConfirm = async () => {
    if (!tradingVariable) {
      return;
    }

    const pair = tradingVariable.pairs.find(
      (pair) => pair.pairIndex === trade.pairIndex,
    );

    if (!pair || !pair.pairId) {
      return;
    }

    onConnectorModalOpenChange(true);

    const bytesproof = await getBytesProof([
      pair.pairId,
      collateralPairIds[collateralType],
    ]);

    if (!account.address || !bytesproof) {
      onConnectorModalOpenChange(false);
      return;
    }

    writeContract(
      {
        abi: TizzTradingAbi,
        address: tizzContractAddresses[collateralType].Trading as Address,
        functionName: "closeTradeMarket",
        args: [
          BigInt(trade.pairIndex),
          BigInt(trade.index),
          bytesproof.proofHex as `0x`,
        ],
        account: account.address,
        gas: 13000000n,
        __mode: "prepared",
      },
      {
        onSettled() {
          onConnectorModalOpenChange(false);
        },
        onError: (err) => {
          console.log("Failed at CloseTradeMarket: ", Object.entries(err));

          enqueueSnackbar("Failed at Closing Trade Market", {
            autoHideDuration: 5000,
            variant: "error",
          });
        },
        onSuccess: (data) => {
          setPendingTransactionHash(
            data,
            "Pending CloseTrade ...",
            "Reverted CloseTrade Transaction",
          );
        },
      },
    );

    onClose();
  };

  const tradeInfos = [
    {
      label: t("collateral"),
      value: `${getPriceStr(tradeInfo.openInterestBaseAsset / trade.leverage)} ${collateralType}`,
    },
    {
      label: t("leverage"),
      value: `${trade.leverage}x`,
    },
    {
      label: t("position-size"),
      value: `${tradeInfo.openInterestBaseAsset} ${collateralType}`,
    },
    {
      label: "",
      value: `${getPriceStr((tradeInfo.openInterestBaseAsset * collateralPriceUsd) / currentPrice)} ${pair.to === "USD" ? pair.from : `${pair.from}/${pair.to}`}`,
    },
    {
      label: t("open-price"),
      value: getPriceStr(trade.openPrice),
    },
    {
      label: t("current-price"),
      value: getPriceStr(currentPrice),
    },
    {
      label: t("price-change"),
      value: (
        <div
          className={twMerge(
            "text-sm",
            currentPrice - trade.openPrice > 0
              ? "text-emerald-400"
              : "text-red-400",
          )}
        >
          {`${getPercentageStr(((currentPrice - trade.openPrice) * 100) / trade.openPrice)}%`}
        </div>
      ),
    },
    {
      label: t("funding-fees"),
      value:
        tradeFundingFee !== undefined
          ? `${getPriceStr(Number(tradeFundingFee) / collateralPrecision)} ${collateralType}`
          : "-",
    },
    {
      label: t("closing-fees"),
      value: closeFee ? `${getPriceStr(closeFee / collateralPrecision)}%` : "-",
    },
    {
      label: t("unrealized-pnl"),
      value: (
        <div
          className={twMerge(
            "text-sm",
            calcGainedBaseAsset(tradeContainer, currentPrice) >= 0
              ? "text-emerald-400"
              : "text-red-400",
          )}
        >
          {calcGainedBaseAssetPercentage(tradeContainer, currentPrice)}%
        </div>
      ),
    },
    {
      label: t("receive"),
      value: getPriceStr(
        tradeInfo.openInterestBaseAsset / trade.leverage +
          calcGainedBaseAsset(tradeContainer, currentPrice) -
          tradeInfo.openInterestBaseAsset * fee.closeFeeP,
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ base: "bg-neutral-950 border border-stroke w-[350px]" }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-center gap-1.5 text-sm">
          <PairIcon from={pair.from} to={pair.to} height={18} width={18} />
          <div
            className={twMerge(
              "text-xl font-semibold",
              trade.buy ? "text-emerald-400" : "text-red-400",
            )}
          >
            {pair.name}
          </div>
          <Chip
            variant="flat"
            radius="sm"
            color={trade.buy ? "success" : "danger"}
          >
            {trade.buy ? t("long") : t("short")}
          </Chip>
        </ModalHeader>
        <ModalBody>
          {tradeInfos.map((tradeInfo) => (
            <div
              key={tradeInfo.label}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-stone-200/80">
                {tradeInfo.label}
              </span>
              <span className="text-sm text-stone-200">{tradeInfo.value}</span>
            </div>
          ))}
        </ModalBody>
        <ModalFooter className="flex items-center justify-center">
          <Button
            color="warning"
            onClick={handleConfirm}
            className={trade.buy ? "bg-amber-400" : "bg-red-500 text-white"}
          >
            {t("confirm")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
