"use client";

import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

import { getPercentageStr, getPriceStr } from "@/utils/price";
import { TradeHistoryRecord } from "@/types/index";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import PairIcon from "@/components/icons/PairIcon";

export type TradeHistoryModalProps = {
  tradeHistory: TradeHistoryRecord;
  isOpen: boolean;
  onOpenChange(): void;
};

export default function TradeHistoryModal({
  tradeHistory,
  isOpen,
  onOpenChange,
}: TradeHistoryModalProps) {
  const t = useTranslations("Trade-TradeHistoryModal");

  const tradeInfos = [
    {
      label: t("date"),
      value: (
        <span className="text-sm text-stone-200">
          {dayjs(new Date(tradeHistory.date)).format("MM/DD")}
        </span>
      ),
    },
    {
      label: t("position-size"),
      value: (
        <span
          className={twMerge(
            "text-sm",
            tradeHistory.buy ? "text-emerald-400" : "text-red-400",
          )}
        >
          {tradeHistory.size * tradeHistory.leverage} {tradeHistory.collateral}
        </span>
      ),
    },
    {
      label: t("leverage"),
      value: (
        <span className="text-sm text-stone-200">{tradeHistory.leverage}x</span>
      ),
    },
    {
      label: t("collateral"),
      value: (
        <span className="text-sm text-stone-200">
          {getPriceStr(tradeHistory.size)} {tradeHistory.collateral}
        </span>
      ),
    },
    {
      label: "PnL",
      value: (
        <span
          className={twMerge(
            "text-sm",
            tradeHistory.pnl_net > 0 ? "text-emerald-400" : "text-red-400",
          )}
        >
          {`${tradeHistory.pnl_net > 0 ? "+" : ""}${getPriceStr(tradeHistory.pnl_net)} ${tradeHistory.collateral} (${getPercentageStr((tradeHistory.pnl_net * 100) / tradeHistory.size)}%)`}
        </span>
      ),
      hidden: tradeHistory.action === "TradeOpenedMarket",
    },
  ];

  const [from, to] = tradeHistory.pair.split("/");

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        base: "bg-neutral-950 border border-stroke w-[350px] py-6",
      }}
    >
      <ModalContent>
        <ModalBody>
          <BaseCard className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-1">
              <PairIcon from={from} to={to} height={18} width={18} />
              <span className={twMerge("text-md font-bold")}>
                {tradeHistory.pair}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs">
                {tradeHistory.action === "TradeClosedMarket"
                  ? "CLOSE @"
                  : "MARKET @"}
              </span>
              <span>
                {tradeHistory.action === "TradeClosedMarket"
                  ? tradeHistory.closePrice
                    ? getPriceStr(tradeHistory.closePrice)
                    : "-"
                  : getPriceStr(tradeHistory.openPrice)}
              </span>
            </div>
          </BaseCard>
          {tradeInfos.map(
            (tradeInfo) =>
              !tradeInfo.hidden && (
                <div
                  key={tradeInfo.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-stone-200/80">
                    {tradeInfo.label}
                  </span>
                  {tradeInfo.value}
                </div>
              ),
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
