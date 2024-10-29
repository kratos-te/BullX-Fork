"use client";

import { Key, useState } from "react";
import { useDisclosure, Button } from "@nextui-org/react";
import { Address } from "viem";
import { Pair, LimitOrder } from "@gainsnetwork/sdk";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import DataTable, { TableColumnProps } from "@/components/tables/DataTableV2";
import PairIcon from "@/components/icons/PairIcon";
import CloseIcon from "@/components/icons/CloseIcon";

import { getPriceStr } from "@/utils/price";

import OpenLimitOrderModal from "./OpenLimitOrderModal";
import { CollateralTypes } from "@/utils/tizz";

export type OrderPanelProps = {
  limitOrders: (LimitOrder & {
    collateralType: CollateralTypes;
    collateralPriceUsd: number;
    pair: Pair;
  })[];
};

export default function OrdersPanel({ limitOrders }: OrderPanelProps) {
  const t = useTranslations("Trade-OrdersPanel");

  const columns: TableColumnProps[] = [
    { id: "type", component: t("type"), allowsSorting: true },
    { id: "pair", component: t("pair"), allowsSorting: true },
    { id: "size", component: t("size"), allowsSorting: true },
    { id: "lev", component: t("lev"), allowsSorting: true },
    { id: "coll", component: t("coll"), allowsSorting: true },
    { id: "triggerPrice", component: t("trigger-price"), allowsSorting: true },
    {
      id: "executionPrice",
      component: t("executation-price"),
      allowsSorting: true,
    },
    { id: "maxSpread", component: t("max-spread") },
    { id: "sltp", component: "SL/TP" },
    { id: "close", component: t("close") },
  ];

  const labelsByType = [t("market"), t("limit"), t("stop")];

  const {
    isOpen: isCancelOrderModalOpen,
    onOpen: onCancelOrderModalOpen,
    onClose: onCancelOrderModalClose,
    onOpenChange: onCancelOrderModalOpenChange,
  } = useDisclosure();

  const [selectedLimitOrder, setSelectedLimitOrder] = useState<
    | (LimitOrder & {
        collateralType: CollateralTypes;
        collateralPriceUsd: number;
        pair: Pair;
      })
    | null
  >(null);
  const [isConnectorModalOpen, setIsConnectorModalOpen] = useState(false);

  const [mode, setMode] = useState<"cancel" | "update">("cancel");

  const handleClickRow = (key: Key, modalMode: "update" | "cancel") => {
    const { trader, pairIndex, index, collateral } = JSON.parse(
      key as string,
    ) as {
      trader: Address;
      pairIndex: number;
      index: number;
      collateral: CollateralTypes;
    };

    const exist = limitOrders.find(
      (limitOrder) =>
        limitOrder.trader === trader &&
        limitOrder.pairIndex === pairIndex &&
        limitOrder.index === index &&
        limitOrder.collateralType === collateral,
    );

    if (exist) {
      setSelectedLimitOrder(exist);
      setMode(modalMode);
      onCancelOrderModalOpen();
    }
  };

  const rows = limitOrders.map((trade) => ({
    id: JSON.stringify({
      trader: trade.trader,
      pairIndex: trade.pairIndex,
      index: trade.index,
      collateral: trade.collateralType,
    }),
    data: {
      type: {
        sortableAmount: trade.type,
        component: (
          <div
            className={twMerge(
              "text-nowrap text-sm capitalize",
              trade.buy ? "text-emerald-400" : "text-red-400",
            )}
          >
            {labelsByType[trade.type]}
          </div>
        ),
      },
      pair: {
        sortableAmount: trade.pairIndex,
        component: (
          <div className="flex justify-start gap-2 text-sm text-stone-200">
            <PairIcon
              from={trade.pair.from}
              to={trade.pair.to}
              width={18}
              height={18}
            />
            <span className="text-nowrap">{trade.pair.name}</span>
          </div>
        ),
      },
      size: {
        sortableAmount: trade.positionSize,
        component: (
          <div className="text-sm text-stone-200">
            <div className="text-nowrap">{`${getPriceStr(trade.positionSize * trade.leverage)} ${trade.collateralType}`}</div>
            <div className="text-nowrap">
              {`${getPriceStr((trade.positionSize * trade.leverage * trade.collateralPriceUsd) / trade.minPrice)} ${
                trade.pair.to === "USD" ? trade.pair.from : trade.pair.name
              }`}
            </div>
          </div>
        ),
      },
      lev: {
        sortableAmount: trade.leverage,
        component: (
          <div className="text-nowrap text-sm text-stone-200">{`${trade.leverage}x`}</div>
        ),
      },
      coll: {
        sortableAmount: trade.positionSize,
        component: (
          <div className="text-nowrap text-sm text-stone-200">
            {`${getPriceStr(trade.positionSize)} ${trade.collateralType}`}
          </div>
        ),
      },
      triggerPrice: {
        sortableAmount: trade.maxPrice,
        component: (
          <div className="text-nowrap text-sm text-stone-200">
            {getPriceStr(trade.maxPrice)}
          </div>
        ),
      },
      executionPrice: {
        sortableAmount: trade.maxPrice,
        component: (
          <div className="text-nowrap text-sm text-stone-200">
            {getPriceStr(
              trade.maxPrice +
                ((trade.buy ? 1 : -1) * trade.maxPrice) /
                  (1 / (trade.pair.spreadP * 0.01) - 1),
            )}
          </div>
        ),
      },
      maxSpread: {
        sortableAmount: trade.maxSlippageP,
        component: (
          <div className="text-nowrap text-sm text-stone-200">
            {trade.maxSlippageP}%
          </div>
        ),
      },
      sltp: {
        component: (
          <div className="text-sm text-stone-200">
            <div className="text-nowrap">{`SL: ${trade.sl > 0 ? getPriceStr(trade.sl) : t("none")}`}</div>
            <div className="text-nowrap">{`TP: ${getPriceStr(trade.tp)}`}</div>
          </div>
        ),
      },
      close: {
        component: (
          <Button
            isIconOnly
            isLoading={
              isConnectorModalOpen &&
              !!selectedLimitOrder &&
              JSON.stringify({
                trader: trade.trader,
                pairIndex: trade.pairIndex,
                index: trade.index,
                collateral: trade.collateralType,
              }) ===
                JSON.stringify({
                  trader: selectedLimitOrder.trader,
                  pairIndex: selectedLimitOrder.pairIndex,
                  index: selectedLimitOrder.index,
                  collateral: selectedLimitOrder.collateralType,
                })
            }
            variant="light"
            onClick={() =>
              handleClickRow(
                JSON.stringify({
                  trader: trade.trader,
                  pairIndex: trade.pairIndex,
                  index: trade.index,
                  collateral: trade.collateralType,
                }),
                "cancel",
              )
            }
          >
            <CloseIcon className="text-sm text-stone-200" />
          </Button>
        ),
      },
    },
  }));

  return (
    <>
      <DataTable
        isHeaderSticky
        columns={columns}
        rows={rows}
        onRowAction={(key) => handleClickRow(key, "update")}
        classNames={{
          base: "h-full overflow-auto",
          thead: "bg-tizz-background",
          th: "!rounded-none",
          tr: "!rounded-none",
          emptyWrapper: "h-[250px]",
        }}
        EmptyContent={<div>{t("no-ordered-trades")}</div>}
      />
      {selectedLimitOrder && (
        <OpenLimitOrderModal
          mode={mode}
          onConnectorModalOpenChange={setIsConnectorModalOpen}
          limitOrder={selectedLimitOrder}
          isOpen={isCancelOrderModalOpen}
          onClose={onCancelOrderModalClose}
          onOpenChange={onCancelOrderModalOpenChange}
        />
      )}
    </>
  );
}
