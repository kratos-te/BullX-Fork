"use client";

import { Key, MouseEventHandler, useMemo, useState } from "react";
import { useChainId } from "wagmi";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

import { getPercentageStr, getPriceStr } from "@/utils/price";

import { useTradeState } from "@/tizz-trade-hooks/useTradeState";
import { useTradeHistory24h } from "@/tizz-trade-hooks/useTradeHistory24h";

import SimpleTable from "@/components/tables/SimpleTable";
import HistorySetting from "./HistorySetting";
import TokenIcon from "@/components/icons/TokenIcon";
import { CollateralTypes, collateralTokenIcons } from "@/utils/tizz";
import TradeHistoryModal from "./TradeHistoryModal";
import { TradeHistoryRecord } from "@/types/index";

export default function TradeHistoryPanel() {
  const t = useTranslations("Trade-TradeHistoryPanel");

  const chainId = useChainId();
  const { tradeState } = useTradeState();
  const tradeHistory24h = useTradeHistory24h(chainId, CollateralTypes.USDT);

  const [isOpen, setIsOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement>();
  const [tradeHistory, setTradeHistory] = useState<TradeHistoryRecord>();

  const handleClickRow: MouseEventHandler<HTMLElement> = (e) => {
    if (e.currentTarget) {
      setTriggerElement(e.currentTarget);
      setIsOpen(true);
    }
  };

  const { histories, dailyVolumn } = useMemo(() => {
    const currentTime = new Date().getTime();
    const dayGap = 24 * 60 * 60 * 1000;

    const filtered = tradeHistory24h
      ? tradeHistory24h
          .filter(
            (trade) =>
              tradeState.tradeHistorySettings.showCloses ||
              trade.action === "TradeOpenedMarket",
          )
          .filter((trade) => {
            if (currentTime - new Date(trade.date).getTime() > dayGap) {
              return false;
            }

            return true;
          })
          .sort((a, b) => {
            if (new Date(a.date) > new Date(b.date)) {
              return -1;
            } else if (new Date(a.date) < new Date(b.date)) {
              return 1;
            } else {
              return 0;
            }
          })
      : [];

    const volumn = filtered
      .filter((trade) => trade.action === "TradeOpenedMarket")
      .reduce(
        (acc, item) =>
          acc + item.size * item.leverage * item.collateralPriceUsd,
        0,
      );

    return {
      histories: filtered,
      dailyVolumn: volumn,
    };
  }, [tradeState.tradeHistorySettings.showCloses, tradeHistory24h]);

  const handleRowAction = (key: Key) => {
    if (!key) {
      return;
    }

    const history = histories.find(
      (item) =>
        JSON.stringify({
          date: item.date,
          addres: item.address,
          action: item.action,
          collateralType: item.collateral,
          pair: item.pair,
        }) === key,
    );

    setTradeHistory(history);
  };

  const columns = useMemo(() => {
    return [
      {
        id: "pair",
        component: t("pair"),
        show: tradeState.tradeHistorySettings.showAllPairs,
      },
      {
        id: "size",
        component: `${t("size")} ${tradeState.tradeHistorySettings.usdPositionSize ? "($)" : ""}`,
        show: true,
      },
      {
        id: "price",
        component: t("price"),
        show: !tradeState.tradeHistorySettings.compact,
      },
      {
        id: "time",
        component: t("time"),
        show: !tradeState.tradeHistorySettings.showAllPairs,
      },
    ].filter((item) => item.show);
  }, [
    t,
    tradeState.tradeHistorySettings.compact,
    tradeState.tradeHistorySettings.showAllPairs,
    tradeState.tradeHistorySettings.usdPositionSize,
  ]);
  const rows = histories.map((item) => ({
    id: JSON.stringify({
      date: item.date,
      addres: item.address,
      action: item.action,
      collateralType: item.collateral,
      pair: item.pair,
    }),
    pair: (
      <span className={item.buy === 1 ? "text-emerald-400" : "text-red-400"}>
        {item.pair}
      </span>
    ),
    size: (
      <div className="flex items-center gap-1">
        <span>
          {getPriceStr(
            tradeState.tradeHistorySettings.usdPositionSize
              ? item.size * item.leverage * item.collateralPriceUsd
              : item.size * item.leverage,
          )}
        </span>
        {!tradeState.tradeHistorySettings.usdPositionSize ? (
          <TokenIcon
            token={collateralTokenIcons[item.collateral]}
            width={12}
            height={12}
          />
        ) : null}
        {item.pnl_net !== 0 ? (
          <span
            className={item.pnl_net > 0 ? "text-emerald-400" : "text-red-400"}
          >{`(${getPercentageStr((item.pnl_net * 100) / item.size)}%)`}</span>
        ) : null}
      </div>
    ),
    price:
      item.action === "TradeOpenedMarket"
        ? getPriceStr(item.openPrice)
        : item.closePrice
          ? getPriceStr(item.closePrice)
          : "-",
    time: (
      <span className="text-gray-400">
        {dayjs(new Date(item.date)).format("HH:mm")}
      </span>
    ),
  }));

  return (
    <div className="relative h-full w-full py-2.5">
      <div className="absolute flex h-[calc(100%-20px)] w-full flex-col gap-3 overflow-hidden px-2.5 md:overflow-auto">
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-xs leading-3">${getPriceStr(dailyVolumn)}</span>
          <HistorySetting />
        </div>

        <SimpleTable
          columns={columns}
          rows={rows}
          classNames={{ tr: "hover:bg-neutral-800 cursor-pointer" }}
          onClickRow={handleClickRow}
          onRowAction={handleRowAction}
        />
      </div>

      {tradeHistory && triggerElement && (
        <TradeHistoryModal
          tradeHistory={tradeHistory}
          triggerElement={triggerElement}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
    </div>
  );
}
