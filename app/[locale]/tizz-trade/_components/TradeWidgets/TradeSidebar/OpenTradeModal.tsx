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
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { useSnackbar } from "notistack";
import { twMerge } from "tailwind-merge";
import { CollateralConfig, Pair, Fee, PositionType } from "@gainsnetwork/sdk";
import { Address, zeroAddress } from "viem";

import { useTranslations } from "next-intl";

import { TradeOrderType } from "@/types/index";
import { getPercentageStr, getPriceStr } from "@/utils/price";

import PairIcon from "@/components/icons/PairIcon";
import {
  CollateralTypes,
  collateralPairIds,
  tizzContractAddresses,
} from "@/utils/tizz";

import { TizzTradingAbi } from "@/abis/Tizz/TizzTrading";
import { TizzFundingFeesAbi } from "@/abis/Tizz/TizzFundingFees";

import { getBytesProof } from "../../../../../_actions/getProof";
import { usePendingTransactionToast } from "@/tizz-trade-hooks/usePendingTransactionToast";
import { useGetFees } from "@/tizz-trade-hooks/useGetFees";

const orderTypeNum = {
  market: 0,
  limit: 1,
  stop: 2,
};

export type OpenTradeModalProps = {
  position: PositionType;
  orderType: TradeOrderType;
  collateralType: CollateralTypes;
  collateralConfig: CollateralConfig;
  collateralAmount: number;
  leverage: number;
  positionSize: number;
  pair: Pair & { pairId?: number };
  fee: Fee;
  openPrice: number;
  maxSlippage: number;
  stopLoss: number;
  takeProfit: number;
  isOpen: boolean;
  onClose(): void;
  onOpenChange(): void;
  onConnectorModalOpenChange(value: boolean): void;
};

export default function OpenTradeModal({
  position,
  orderType,
  collateralType,
  collateralAmount,
  collateralConfig,
  leverage,
  positionSize,
  pair,
  fee,
  openPrice,
  maxSlippage,
  stopLoss,
  takeProfit,
  isOpen,
  onClose,
  onOpenChange,
  onConnectorModalOpenChange,
}: OpenTradeModalProps) {
  const t = useTranslations("Trade-OpenTradeModal");
  const { enqueueSnackbar } = useSnackbar();
  const account = useAccount();
  const { writeContract } = useWriteContract();

  const { setPendingTransactionHash } = usePendingTransactionToast();

  const { predictFee } = useGetFees({
    input: account.address
      ? {
          trader: account.address,
          pairIndex: pair.pairIndex,
          index: 0,
          long: PositionType.LONG === position,
          positionBaseAsset: Math.floor(
            collateralAmount * collateralConfig.precision,
          ),

          leverage: leverage,
          fee,
        }
      : undefined,
    collateralType,
  });

  const { data: liquidationPriceData } = useReadContract({
    address: tizzContractAddresses[collateralType].FundingFees as Address,
    abi: TizzFundingFeesAbi,
    functionName: "getTradeLiquidationPrice",
    args: account.address
      ? [
          {
            trader: account.address,
            pairIndex: BigInt(pair.pairIndex),
            index: 0n,
            openPrice: BigInt(Math.floor(openPrice * 1e10)),
            long: position === PositionType.LONG,
            collateral: BigInt(
              Math.floor(collateralAmount * collateralConfig.precision),
            ),
            leverage: BigInt(leverage),
          },
        ]
      : undefined,
  });

  const handleConfirm = async () => {
    onConnectorModalOpenChange(true);

    const bytesproof = await getBytesProof([
      pair.pairId!,
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
        functionName: "openTrade",
        args: [
          {
            trader: account.address,
            pairIndex: BigInt(pair.pairIndex),
            index: BigInt(0),
            initialPosToken: BigInt(0),
            positionSizeBaseAsset: BigInt(
              Math.floor(collateralAmount * collateralConfig.precision),
            ),
            openPrice: BigInt(Math.floor(openPrice * 1e10)),
            buy: position === PositionType.LONG,
            leverage: BigInt(leverage),
            tp: BigInt(Math.floor(takeProfit * 1e10)),
            sl: BigInt(Math.floor(stopLoss * 1e10)),
          },
          orderTypeNum[orderType],
          BigInt(Math.floor(maxSlippage * 1e10)),
          zeroAddress,
          bytesproof.proofHex as `0x`,
        ],
        gas: 20000000n,
        __mode: "prepared",
      },
      {
        onSettled() {
          onConnectorModalOpenChange(false);
        },
        onError: (err) => {
          console.log("error while open trades: ", Object.entries(err));

          enqueueSnackbar("Failed at Opening Trade", {
            autoHideDuration: 5000,
            variant: "error",
          });
        },
        onSuccess: (data) => {
          setPendingTransactionHash(
            data,
            "Pending OpenTrade ...",
            "Reverted OpenTrade transaction",
          );
        },
      },
    );

    onClose();
  };

  const feeData = predictFee !== undefined ? predictFee : undefined;

  const tradeInfos = [
    {
      label: t("collateral"),
      value: `${collateralAmount} ${collateralType}`,
    },
    {
      label: t("leverage"),
      value: `${leverage}x`,
    },
    {
      label: t("position-size"),
      value: `${collateralAmount * leverage} ${collateralType}`,
    },
    {
      label: "",
      value: `${getPriceStr(positionSize)} ${pair.to === "USD" ? pair.from : `${pair.from}/${pair.to}`}`,
    },
    {
      label: t("est-open-price"),
      value: getPriceStr(openPrice),
    },
    {
      label: t("max-slippage"),
      value: `${maxSlippage}%`,
    },
    {
      label: t("liq-price"),
      value:
        liquidationPriceData !== undefined
          ? getPriceStr(Number(liquidationPriceData) / 1e10)
          : "-",
    },
    {
      label: t("stop-loss"),
      value: stopLoss === 0 ? "None" : getPriceStr(stopLoss),
    },
    {
      label: t("take-profit"),
      value: getPriceStr(takeProfit),
    },
    {
      label: t("fees"),
      value:
        feeData !== undefined
          ? `${getPriceStr(Number(feeData) / collateralConfig.precision)} ${collateralType} (${getPercentageStr((Number(feeData) * 100) / collateralConfig.precision / collateralAmount / leverage)}%)`
          : "-",
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
              position === PositionType.LONG
                ? "text-emerald-400"
                : "text-red-400",
            )}
          >
            {pair.name}
          </div>
          <Chip
            variant="flat"
            radius="sm"
            color={position === PositionType.LONG ? "success" : "danger"}
          >
            {position}
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
            className={
              position === PositionType.LONG
                ? "bg-amber-300"
                : "bg-red-500 text-white"
            }
          >
            {t("confirm")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
