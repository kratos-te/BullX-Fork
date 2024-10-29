"use client";

import { Key, useState, useCallback } from "react";
import Image from "next/image";
import {
  useDisclosure,
  Button,
  TableSlots,
  SlotsToClasses,
} from "@nextui-org/react";
import { Address } from "viem";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

import DataTable, { TableColumnProps } from "@/components/tables/DataTableV2";
import PairIcon from "@/components/icons/PairIcon";

import { getPercentageStr, getPriceStr } from "@/utils/price";
import { shrinkAddress } from "@/utils/index";
import { mergeClassNames } from "@/utils/mergeClassNames";
import { TradeHistoryRecord } from "@/types/index";

import TradeHistoryModal from "./TradeHistoryModal";
import ShareTradeModal from "./ShareTradeModal";

import shareIconSrc from "@/assets/icons/share-icon.svg";
import { useAccount } from "wagmi";

type HistoriesPanelProps = {
  histories: TradeHistoryRecord[];
  isTeamView?: boolean;
  isShowAll?: boolean;
  classNames?: SlotsToClasses<TableSlots>;
};

export default function HistoriesPanel({
  histories,
  isTeamView,
  isShowAll,
  classNames,
}: HistoriesPanelProps) {
  const t = useTranslations("Trade-HistoriesPanel");
  const account = useAccount();

  const columns: TableColumnProps[] = [
    { id: "type", component: t("type"), allowsSorting: true },
    { id: "date", component: t("date"), allowsSorting: true },
    { id: "pair", component: t("pair"), allowsSorting: true },
    { id: "address", component: t("address"), allowsSorting: true },
    { id: "action", component: "Action", allowsSorting: false },
    { id: "price", component: "Price", allowsSorting: false },
    { id: "lev", component: t("lev"), allowsSorting: true },
    { id: "coll", component: t("coll"), allowsSorting: true },
    { id: "pnl", component: "PnL", allowsSorting: true },
    { id: "percentage", component: "%" },
  ].filter((column) => (isShowAll ? true : column.id !== "action"));

  const {
    isOpen: isTradeHistoryModalOpen,
    onOpen: onTradeHistoryModalOpen,
    onOpenChange: onTradeHistoryModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isTradeShareOpen,
    onOpen: onTradeShareOpen,
    onOpenChange: onTradeShareOpenChange,
  } = useDisclosure();

  const [selectedTradeHistory, setSelectedTradeHistory] =
    useState<TradeHistoryRecord | null>(null);
  const [selectedTradeHistoryForShare, setSelectedTradeHistoryForShare] =
    useState<TradeHistoryRecord | null>(null);

  const handleOpenTradeShareModal = useCallback(
    (tradeHistory: TradeHistoryRecord) => {
      setSelectedTradeHistoryForShare(tradeHistory);
      onTradeShareOpen();
    },
    [onTradeShareOpen],
  );

  const rows = histories
    .filter((history) => {
      if (isTeamView) {
        return true;
      }

      return history.address === account.address;
    })
    .filter((history) =>
      isShowAll ? true : history.action === "TradeClosedMarket",
    )
    .map((history) => ({
      id: JSON.stringify({
        date: history.date,
        addres: history.address,
        action: history.action,
        collateralType: history.collateral,
        pair: history.pair,
      }),
      data: {
        type: {
          sortableAmount: history.buy ? 0 : 1,
          component: (
            <div
              className={twMerge(
                "flex items-center gap-2 text-sm capitalize",
                history.buy ? "text-emerald-400" : "text-red-400",
              )}
            >
              <div className="w-[45px]">
                {history.buy ? t("long") : t("short")}
              </div>
              <Button
                isIconOnly
                variant="light"
                onClick={() => handleOpenTradeShareModal(history)}
              >
                <Image src={shareIconSrc} alt="share" width={16} height={16} />
              </Button>
            </div>
          ),
        },
        date: {
          sortableAmount: new Date(history.date),
          component: (
            <div className="flex gap-2 text-sm">
              <span className="text-stone-200">
                {dayjs(new Date(history.date)).format("MM/DD")}
              </span>
              <span className="text-gray-400">
                {dayjs(new Date(history.date)).format("HH:mm")}
              </span>
            </div>
          ),
        },
        pair: {
          sortableAmount: history.pair,
          component: (
            <div className="flex justify-start gap-2 text-sm">
              <PairIcon
                from={history.pair.split("/")[0]}
                to={history.pair.split("/")[1]}
                width={18}
                height={18}
              />
              <span>{history.pair}</span>
            </div>
          ),
        },
        address: {
          sortableAmount: history.address,
          component: (
            <div className="text-sm text-stone-200">
              {shrinkAddress(history.address as Address)}
            </div>
          ),
        },
        action: {
          component: (
            <div className="text-sm text-stone-200">{history.action}</div>
          ),
        },
        price: {
          component: isShowAll ? (
            <div className="text-sm text-stone-200">
              {history.action === "TradeOpenedMarket"
                ? getPriceStr(history.openPrice)
                : history.closePrice
                  ? getPriceStr(history.closePrice)
                  : "-"}
            </div>
          ) : (
            <div>
              <div className="text-sm text-stone-200">
                {`Open: ${getPriceStr(history.openPrice)}`}
              </div>

              <div className="text-sm text-stone-200">
                {`Close: ${history.closePrice !== undefined ? getPriceStr(history.closePrice) : "-"}`}
              </div>
            </div>
          ),
        },
        lev: {
          sortableAmount: history.leverage,
          component: (
            <div className="text-sm text-stone-200">{`${history.leverage}x`}</div>
          ),
        },
        coll: {
          sortableAmount: history.size,
          component: (
            <div className="text-nowrap text-sm text-stone-200">
              {`${getPriceStr(history.size)} ${history.collateral}`}
            </div>
          ),
        },
        pnl: {
          sortableAmount: history.pnl_net,
          component: (
            <div
              className={twMerge(
                "text-nowrap text-sm",
                history.pnl_net > 0 ? "text-emerald-400" : "text-red-400",
              )}
            >
              {history.action !== "TradeOpenedMarket"
                ? `${history.pnl_net > 0 ? "+" : ""}${getPriceStr(history.pnl_net)} ${history.collateral}`
                : ""}
            </div>
          ),
        },
        percentage: {
          sortableAmount: history.pnl_net,
          component: (
            <div
              className={twMerge(
                "text-sm",
                history.pnl_net > 0 ? "text-emerald-400" : "text-red-400",
              )}
            >
              {history.action !== "TradeOpenedMarket"
                ? `${getPercentageStr((history.pnl_net * 100) / history.size)} %`
                : ""}
            </div>
          ),
        },
      },
    }));

  const handleRowAction = (key: Key) => {
    const exist = histories.find(
      (history) =>
        JSON.stringify({
          date: history.date,
          addres: history.address,
          action: history.action,
          collateralType: history.collateral,
          pair: history.pair,
        }) === key,
    );

    if (exist) {
      setSelectedTradeHistory(exist);
      onTradeHistoryModalOpen();
    }
  };

  return (
    <>
      <DataTable
        isHeaderSticky
        columns={columns}
        rows={rows}
        onRowAction={handleRowAction}
        classNames={mergeClassNames<TableSlots>(
          {
            base: "h-full overflow-auto",
            thead: "bg-tizz-background",
            th: "!rounded-none",
            tr: "!rounded-none",
            emptyWrapper: "h-[250px]",
          },
          classNames,
        )}
        EmptyContent={<div>{t("no-personal-trade-histories")}</div>}
      />
      {selectedTradeHistory && (
        <TradeHistoryModal
          tradeHistory={selectedTradeHistory}
          isOpen={isTradeHistoryModalOpen}
          onOpenChange={onTradeHistoryModalOpenChange}
        />
      )}

      {selectedTradeHistoryForShare && (
        <ShareTradeModal
          tradeInfo={{
            pairName: selectedTradeHistoryForShare.pair,
            buy: !!selectedTradeHistoryForShare.buy,
            leverage: selectedTradeHistoryForShare.leverage,
            pnl: selectedTradeHistoryForShare.pnl_net,
            pnlPercentageStr: getPercentageStr(
              (selectedTradeHistoryForShare.pnl_net * 100) /
                selectedTradeHistoryForShare.size,
            ),
            openPrice: selectedTradeHistoryForShare.openPrice,
            lastPrice: selectedTradeHistoryForShare.closePrice,
          }}
          isOpen={isTradeShareOpen}
          onOpenChange={onTradeShareOpenChange}
        />
      )}
    </>
  );
}
