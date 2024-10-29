"use client";

import { useState, ChangeEvent } from "react";
import ReactLoading from "react-loading";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Chip,
} from "@nextui-org/react";
import { useAccount, useWriteContract } from "wagmi";
import { useSnackbar } from "notistack";
import { twMerge } from "tailwind-merge";
import { Pair } from "@gainsnetwork/sdk";
import { Address } from "viem";
import { useTranslations } from "next-intl";
import { TradeContainer } from "@/types/index";

import { getPercentageStr, getPriceStr } from "@/utils/price";

import BorderedInput from "@/components/inputs/BorderedInput/BorderedInput";
import PairIcon from "@/components/icons/PairIcon";
import { CollateralTypes, tizzContractAddresses } from "@/utils/tizz";
import { TizzTradingAbi } from "@/abis/Tizz/TizzTrading";
import { usePendingTransactionToast } from "@/tizz-trade-hooks/usePendingTransactionToast";

export type SLTPUpdateModalProps = {
  tradeContainer: TradeContainer & {
    collateralType: CollateralTypes;
    collateralPriceUsd: number;
    pair: Pair;
  };
  currentPrice: number;
  isOpen: boolean;
  onOpenChange(): void;
};

export default function SLTPUpdateModal({
  tradeContainer,
  currentPrice,
  isOpen,
  onOpenChange,
}: SLTPUpdateModalProps) {
  const t = useTranslations("Trade-SLTPUpdateModal");
  const { enqueueSnackbar } = useSnackbar();
  const { setPendingTransactionHash } = usePendingTransactionToast();

  const account = useAccount();
  const { writeContract } = useWriteContract();

  const { trade, pair, collateralType, initialAccFees } = tradeContainer;

  const [stopLoss, setStopLoss] = useState<string>(trade.sl + "");
  const [takeProfit, setTakeProfit] = useState<string>(trade.tp + "");
  const [isSLUpdating, setIsSLUpdating] = useState(false);
  const [isTPUpdating, setIsTPUpdating] = useState(false);

  const handleUpdateSL = async () => {
    if (!account.address) {
      return;
    }

    setIsSLUpdating(true);

    writeContract(
      {
        abi: TizzTradingAbi,
        address: tizzContractAddresses[collateralType].Trading as Address,
        functionName: "updateSl",
        args: [
          BigInt(trade.pairIndex),
          BigInt(trade.index),
          BigInt(Math.floor(Math.floor(+stopLoss) * 1e10)),
        ],
        account: account.address,
      },
      {
        onError: (err) => {
          console.log("Failed at Updating SL: ", Object.entries(err));

          enqueueSnackbar("Failed at Updating Sl", {
            autoHideDuration: 5000,
            variant: "error",
          });
        },
        onSuccess(data) {
          setPendingTransactionHash(
            data,
            "Pending Update SL ...",
            "Reverted Update SL transaction",
          );
        },
        onSettled() {
          setIsSLUpdating(false);
        },
      },
    );
  };

  const handleUpdateTP = async () => {
    if (!account.address) {
      return;
    }

    setIsTPUpdating(true);

    writeContract(
      {
        abi: TizzTradingAbi,
        address: tizzContractAddresses[collateralType].Trading as Address,
        functionName: "updateTp",
        args: [
          BigInt(trade.pairIndex),
          BigInt(trade.index),
          BigInt(Math.floor(Math.floor(+takeProfit) * 1e10)),
        ],
        account: account.address,
      },
      {
        onSettled() {
          setIsTPUpdating(false);
        },
        onError: (err) => {
          console.log("Failed at Updating TP: ", Object.entries(err));

          enqueueSnackbar("Failed at Updating Tp", {
            autoHideDuration: 5000,
            variant: "error",
          });
        },
        onSuccess(data) {
          setPendingTransactionHash(
            data,
            "Pending Update TP ...",
            "Reverted Update TP transaction",
          );
        },
      },
    );
  };

  const handleChangeStopLossPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value)) {
      setStopLoss(e.target.value);
    }
  };

  const handleChangeTakeProfitPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value)) {
      setTakeProfit(e.target.value);
    }
  };

  const tradeInfos = [
    {
      label: t("current-price"),
      value: getPriceStr(currentPrice),
    },
    {
      label: t("liquidation-price"),
      value: getPriceStr(initialAccFees.liquidationPrice),
    },
  ];

  const slP =
    !Number.isNaN(stopLoss) && trade.openPrice
      ? ((trade.buy ? 1 : -1) *
          (+stopLoss - trade.openPrice) *
          100 *
          trade.leverage) /
        trade.openPrice
      : -101;

  const tpP =
    !Number.isNaN(takeProfit) && trade.openPrice
      ? ((trade.buy ? 1 : -1) *
          (+takeProfit - trade.openPrice) *
          100 *
          trade.leverage) /
        trade.openPrice
      : -1;

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
            {t("update-sl-tp")}
          </Chip>
        </ModalHeader>
        <ModalBody>
          <div className="flex w-full flex-col gap-4">
            <div className="flex gap-4">
              <span className="text-xs text-stone-200">{t("stop-loss")}</span>
              <span className="text-xs text-red-400">
                {+stopLoss === 0
                  ? "(None)"
                  : `(${getPercentageStr(Math.max(slP, -100))}%)`}
              </span>
            </div>
            <div className="flex gap-4">
              <BorderedInput
                type="text"
                labelPlacement="outside"
                value={stopLoss}
                onChange={handleChangeStopLossPrice}
                className="flex-1"
              />
              <Button
                className="w-[95px] items-center justify-center rounded-md text-stone-200"
                onClick={handleUpdateSL}
                isDisabled={
                  (stopLoss !== "0" && (slP > 0 || slP < -75)) || isSLUpdating
                }
              >
                {isSLUpdating ? (
                  <ReactLoading type={"bubbles"} color={"#d1d1d1"} />
                ) : (
                  t("update")
                )}
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex gap-4">
              <span className="text-xs text-stone-200">{t("take-profit")}</span>
              <span className="text-xs text-emerald-400">{`(${getPercentageStr(tpP)}%)`}</span>
            </div>
            <div className="flex gap-4">
              <BorderedInput
                type="text"
                labelPlacement="outside"
                value={takeProfit}
                onChange={handleChangeTakeProfitPrice}
                className="flex-1"
              />
              <Button
                className="w-[95px] items-center justify-center rounded-md text-stone-200"
                onClick={handleUpdateTP}
                isDisabled={tpP < 0 || tpP > 900 || isTPUpdating}
              >
                {isTPUpdating ? (
                  <ReactLoading type={"bubbles"} color={"#d1d1d1"} />
                ) : (
                  t("update")
                )}
              </Button>
            </div>
          </div>
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
      </ModalContent>
    </Modal>
  );
}
