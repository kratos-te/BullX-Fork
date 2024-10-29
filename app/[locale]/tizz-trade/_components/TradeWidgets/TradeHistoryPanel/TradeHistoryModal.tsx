"use client";

import { useEffect, useRef } from "react";
import { Popover, PopoverContent, Tooltip } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { Address } from "viem";

import { getPriceStr } from "@/utils/price";
import { TradeHistoryRecord } from "@/types/index";

import PairIcon from "@/components/icons/PairIcon";
import { shrinkAddress } from "@/utils/index";

export type TradeHistoryModalProps = {
  tradeHistory: TradeHistoryRecord;
  isOpen: boolean;
  triggerElement: HTMLElement;
  onOpenChange(open: boolean): void;
};

export default function TradeHistoryModal({
  tradeHistory,
  isOpen,
  onOpenChange,
  triggerElement,
}: TradeHistoryModalProps) {
  const t = useTranslations("Trade-TradeHistoryModal");

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current = triggerElement;
  }, [triggerElement]);

  const tradeInfos = [
    {
      id: "address",
      label: (
        <Tooltip content={tradeHistory.address}>
          <span className="text-sm text-stone-400">
            {shrinkAddress(tradeHistory.address as Address, true)}
          </span>
        </Tooltip>
      ),
      value: (
        <span className="text-sm text-stone-400">
          {dayjs(new Date(tradeHistory.date)).format("HH:mm")}
        </span>
      ),
    },
    {
      id: "price",
      label: (
        <div className="flex items-center gap-1 text-sm">
          <PairIcon
            from={tradeHistory.pair.split("/")[0]}
            to={tradeHistory.pair.split("/")[1]}
            width={16}
            height={16}
          />
          <span>{tradeHistory.pair}</span>
          <span
            className={twMerge(
              tradeHistory.buy ? "text-emerald-400" : "text-red-400",
            )}
          >
            {tradeHistory.buy ? t("long") : t("short")}
          </span>
        </div>
      ),
      value: (
        <span
          className={twMerge(
            "text-sm",
            tradeHistory.buy ? "text-emerald-400" : "text-red-400",
          )}
        >
          {tradeHistory.closePrice ? getPriceStr(tradeHistory.closePrice) : ""}
        </span>
      ),
    },
    {
      id: "positionSize",
      label: t("position-size"),
      value: (
        <span className="text-sm text-stone-200">
          {getPriceStr(tradeHistory.size * tradeHistory.leverage)}{" "}
          {tradeHistory.collateral}
        </span>
      ),
    },
    {
      id: "leverage",
      label: t("leverage"),
      value: (
        <span className="text-sm text-stone-200">{tradeHistory.leverage}x</span>
      ),
    },
    {
      id: "collateral",
      label: t("collateral"),
      value: (
        <span className="text-sm text-stone-200">
          {getPriceStr(tradeHistory.size)} {tradeHistory.collateral}
        </span>
      ),
    },
  ];

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerRef={ref}
      placement="right-start"
      classNames={{
        base: "bg-neutral-900 w-[300px] rounded-sm",
        content:
          "bg-transparent flex border border-stroke justify-between w-full",
      }}
    >
      <div></div>
      <PopoverContent>
        {tradeInfos.map((tradeInfo) => (
          <div
            key={tradeInfo.id}
            className="flex w-full items-center justify-between px-1"
          >
            <span className="text-sm text-stone-200/60">{tradeInfo.label}</span>
            {tradeInfo.value}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
