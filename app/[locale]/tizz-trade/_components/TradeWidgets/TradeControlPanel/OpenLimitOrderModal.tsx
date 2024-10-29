"use client";

import { useState, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
} from "@nextui-org/react";
import ReactLoading from "react-loading";
import { useAccount, useWriteContract } from "wagmi";
import { useSnackbar } from "notistack";
import { twMerge } from "tailwind-merge";
import { Pair, LimitOrder } from "@gainsnetwork/sdk";
import { Address } from "viem";
import { useTranslations } from "next-intl";

import { usePricingCharts } from "@/tizz-trade-hooks/usePricingCharts";
import { usePendingTransactionToast } from "@/tizz-trade-hooks/usePendingTransactionToast";

import { getPercentageStr, getPriceStr } from "@/utils/price";

import BorderedInput from "@/components/inputs/BorderedInput/BorderedInput";
import PairIcon from "@/components/icons/PairIcon";
import { CollateralTypes, tizzContractAddresses } from "@/utils/tizz";
import { TizzTradingAbi } from "@/abis/Tizz/TizzTrading";

import EditIcon from "@/components/icons/EditIcon";

export type OpenLimitOrderModalProps = {
  mode: "cancel" | "update";
  limitOrder: LimitOrder & {
    collateralType: CollateralTypes;
    collateralPriceUsd: number;
    pair: Pair;
  };
  isOpen: boolean;
  onClose(): void;
  onOpenChange(): void;
  onConnectorModalOpenChange(value: boolean): void;
};

export default function OpenLimitOrderModal({
  mode,
  limitOrder,
  isOpen,
  onClose,
  onOpenChange,
  onConnectorModalOpenChange,
}: OpenLimitOrderModalProps) {
  const t = useTranslations("Trade-OpenLimitOrderModal");

  const labelsByType = [t("market"), t("limit"), t("stop")];

  const account = useAccount();
  const { writeContract } = useWriteContract();

  const { enqueueSnackbar } = useSnackbar();
  const { setPendingTransactionHash } = usePendingTransactionToast();

  const pricingCharts = usePricingCharts();

  const [active, setActive] = useState(false);
  const [minPrice, setMinPrice] = useState<string>(limitOrder.minPrice + "");
  const [maxSlippage, setMaxSlippage] = useState<string>(
    limitOrder.maxSlippageP + "",
  );
  const [stopLoss, setStopLoss] = useState<string>(limitOrder.sl + "");
  const [takeProfit, setTakeProfit] = useState<string>(limitOrder.tp + "");
  const [isConnectorModalOpen, setIsConnectorModalOpen] = useState(false);

  const handleConfirm = async () => {
    if (!account.address) {
      return;
    }

    onConnectorModalOpenChange(true);
    writeContract(
      {
        abi: TizzTradingAbi,
        address: tizzContractAddresses[limitOrder.collateralType]
          .Trading as Address,
        functionName: "cancelOpenLimitOrder",
        args: [BigInt(limitOrder.pairIndex), BigInt(limitOrder.index)],
        account: account.address,
      },
      {
        onSettled() {
          onConnectorModalOpenChange(false);
        },
        onError: (err) => {
          console.log(
            "Failed at Cancel Open Limit Order: ",
            Object.entries(err),
          );
          enqueueSnackbar("Failed at Canceling Open Limit Order", {
            autoHideDuration: 5000,
            variant: "error",
          });
        },
        onSuccess(data) {
          setPendingTransactionHash(
            data,
            "Pending Canceling Open Limit Order...",
            "Reverted Canceling Transaction",
          );
        },
      },
    );

    onClose();
  };

  const handleUpdate = async () => {
    const price =
      pricingCharts &&
      pricingCharts.closes?.[limitOrder.pairIndex] !== undefined
        ? pricingCharts.closes?.[limitOrder.pairIndex]
        : 0;
    const limitPriceNum = !Number.isNaN(+minPrice) ? +minPrice : 0;

    const spread = +maxSlippage;
    const sl = +stopLoss;
    const tp = +takeProfit;

    const slP =
      !Number.isNaN(stopLoss) && limitPriceNum
        ? ((limitOrder.buy ? 1 : -1) *
            (+stopLoss - limitPriceNum) *
            100 *
            limitOrder.leverage) /
          limitPriceNum
        : -101;

    const tpP =
      !Number.isNaN(takeProfit) && limitPriceNum
        ? ((limitOrder.buy ? 1 : -1) *
            (+takeProfit - limitPriceNum) *
            100 *
            limitOrder.leverage) /
          limitPriceNum
        : -1;

    let disabledBy: string | null = null;

    if (
      (limitOrder.buy && price < limitPriceNum) ||
      (!limitOrder.buy && price > limitPriceNum)
    ) {
      disabledBy = t("wrong-limit-price");
    }

    if (spread === 0) {
      disabledBy = t("slippage-is-0");
    }

    if (slP < -75 && stopLoss !== "0") {
      disabledBy = t("stop-less-is-too-big");
    }

    if (slP > 0 && stopLoss !== "0") {
      disabledBy = t("stop-less-greater-than-price");
    }

    if (tpP < 0) {
      disabledBy = t("take-profit-less-than-price");
    }

    if (tpP > 900) {
      disabledBy = t("take-profit-is-too-big");
    }

    if (disabledBy) {
      enqueueSnackbar(disabledBy, {
        variant: "error",
      });
      return;
    }

    if (!account.address) {
      return;
    }

    setIsConnectorModalOpen(true);

    writeContract(
      {
        abi: TizzTradingAbi,
        address: tizzContractAddresses[limitOrder.collateralType]
          .Trading as Address,
        functionName: "updateOpenLimitOrder",
        args: [
          BigInt(limitOrder.pairIndex),
          BigInt(limitOrder.index),
          BigInt(Math.floor(limitPriceNum * 1e10)),
          BigInt(Math.floor(tp * 1e10)),
          BigInt(Math.floor(sl * 1e10)),
          BigInt(Math.floor(spread * 1e10)),
        ],
        account: account.address,
      },
      {
        onSettled() {
          setIsConnectorModalOpen(false);
        },
        onError: (err) => {
          console.log("Failed at updateOpenLimitOrder: ", Object.entries(err));

          enqueueSnackbar("Failed at Updating Open Limit Order", {
            autoHideDuration: 5000,
            variant: "error",
          });
        },
        onSuccess: (data) => {
          setPendingTransactionHash(
            data,
            "Pending Updating Open Limit Order...",
            "Reverted Updating Transaction",
          );

          setActive(false);
          onClose();
        },
      },
    );
  };

  const handleChangeSlippage = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      /^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value) &&
      !Number.isNaN(e.target.value) &&
      +e.target.value >= 0 &&
      +e.target.value <= 100
    ) {
      setMaxSlippage(e.target.value);
    }
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

  const handleChangeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value)) {
      setMinPrice(e.target.value);
    }
  };

  const tradeInfos = [
    {
      label: t("leverage"),
      value: `${limitOrder.leverage}x`,
    },
    {
      label: t("collateral"),
      value: `${getPriceStr(limitOrder.positionSize)} ${limitOrder.collateralType}`,
    },
    {
      label: t("position-size"),
      value: `${limitOrder.positionSize * limitOrder.leverage} ${limitOrder.collateralType}`,
      component: (
        <div className="flex flex-col items-end justify-end gap-1">
          <span className="text-sm text-stone-200">
            {`${limitOrder.positionSize * limitOrder.leverage} ${limitOrder.collateralType}`}
          </span>
          <span className="text-xs text-gray-400">
            {`${getPriceStr((limitOrder.positionSize * limitOrder.leverage * limitOrder.collateralPriceUsd) / limitOrder.minPrice)} ${limitOrder.pair.to === "USD" ? limitOrder.pair.from : `${limitOrder.pair.from}/${limitOrder.pair.to}`}`}
          </span>
        </div>
      ),
    },
    {
      label: t("trigger-price"),
      value: getPriceStr(limitOrder.minPrice),
      component: active && (
        <BorderedInput
          type="text"
          labelPlacement="outside"
          value={minPrice}
          onChange={handleChangeMinPrice}
          className="w-[150px]"
          classNames={{
            input: "text-right",
          }}
        />
      ),
    },
    {
      label: t("execution-price"),
      value: getPriceStr(limitOrder.maxPrice),
    },
    {
      label: t("max-spread"),
      value: `${getPercentageStr(limitOrder.maxSlippageP)}%`,
      component: active && (
        <BorderedInput
          type="text"
          labelPlacement="outside"
          value={maxSlippage}
          onChange={handleChangeSlippage}
          size="sm"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-small text-stone-200">%</span>
            </div>
          }
          className="w-[60px]"
          classNames={{
            input: "text-xs",
          }}
        />
      ),
    },
    {
      label: t("stop-loss"),
      value: limitOrder.sl > 0 ? getPriceStr(limitOrder.sl) : t("none"),
      component: active && (
        <BorderedInput
          type="text"
          labelPlacement="outside"
          value={stopLoss}
          onChange={handleChangeStopLossPrice}
          size="sm"
          className="w-[150px]"
          classNames={{
            input: "text-right",
          }}
        />
      ),
    },
    {
      label: t("take-profit"),
      value: getPriceStr(limitOrder.tp),
      component: active && (
        <BorderedInput
          type="text"
          labelPlacement="outside"
          placeholder={t("take-profit-price")}
          value={takeProfit}
          onChange={handleChangeTakeProfitPrice}
          size="sm"
          className="w-[150px]"
          classNames={{
            input: "text-right",
          }}
        />
      ),
    },
    {
      label: t("opening-fee"),
      value: "Coming soon...",
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
          <PairIcon
            from={limitOrder.pair.from}
            to={limitOrder.pair.to}
            height={18}
            width={18}
          />
          <div
            className={twMerge(
              "text-xl font-semibold",
              limitOrder.buy ? "text-emerald-400" : "text-red-400",
            )}
          >
            {limitOrder.pair.name}
          </div>
          <Chip
            variant="flat"
            radius="sm"
            color={limitOrder.buy ? "success" : "danger"}
          >
            {labelsByType[limitOrder.type]}{" "}
            {limitOrder.buy ? t("long") : t("short")}
          </Chip>
        </ModalHeader>
        <ModalBody>
          {tradeInfos.map((tradeInfo) => (
            <div
              key={tradeInfo.label}
              className="flex items-start justify-between"
            >
              <span className="text-sm text-stone-200/80">
                {tradeInfo.label}
              </span>
              {tradeInfo.component ? (
                tradeInfo.component
              ) : (
                <span className="text-sm text-stone-200">
                  {tradeInfo.value}
                </span>
              )}
            </div>
          ))}
        </ModalBody>
        <ModalFooter className="flex items-center justify-center">
          {mode === "cancel" ? (
            <Button
              color="warning"
              onClick={handleConfirm}
              className={
                limitOrder.buy ? "bg-amber-300" : "bg-red-500 text-white"
              }
            >
              {t("confirm")}
            </Button>
          ) : mode === "update" && active ? (
            <div className="flex items-center gap-2">
              <Button variant="bordered" onClick={() => setActive(false)}>
                {t("cancel")}
              </Button>
              <Button
                color="warning"
                onClick={handleUpdate}
                className={
                  limitOrder.buy ? "bg-amber-300" : "bg-red-500 text-white"
                }
              >
                {isConnectorModalOpen ? (
                  <ReactLoading type={"bubbles"} color={"#d1d1d1"} />
                ) : (
                  t("submit")
                )}
              </Button>
            </div>
          ) : (
            <Button
              color="warning"
              onClick={() => setActive(true)}
              endContent={<EditIcon size={24} className="scale-50" />}
              className={
                limitOrder.buy ? "bg-amber-300" : "bg-red-500 text-white"
              }
            >
              {t("update")}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
