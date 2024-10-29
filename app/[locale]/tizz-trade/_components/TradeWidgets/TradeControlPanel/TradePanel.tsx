"use client";

import { Key, useState } from "react";
import Image from "next/image";
import { useDisclosure, Button } from "@nextui-org/react";
import { Address } from "viem";
import { Pair, Fee } from "@gainsnetwork/sdk";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import DataTable, { TableColumnProps } from "@/components/tables/DataTableV2";
import PairIcon from "@/components/icons/PairIcon";
import CloseIcon from "@/components/icons/CloseIcon";

import { usePricingCharts } from "@/tizz-trade-hooks/usePricingCharts";

import { getPercentageStr, getPriceStr } from "@/utils/price";
import { CollateralTypes } from "@/utils/tizz";
import {
  calcGainedBaseAsset,
  calcGainedBaseAssetPercentage,
} from "@/utils/index";
import { TradeContainer } from "@/types/index";

import CloseTradeModal from "./CloseTradeModal";
import SLTPUpdateModal from "./SLTPUpdateModal";
import ShareTradeModal from "./ShareTradeModal";

import shareIconSrc from "@/assets/icons/share-icon.svg";
import EditIcon from "@/components/icons/EditIcon";

export type TradePanelProps = {
  tradeContainers: (TradeContainer & {
    collateralType: CollateralTypes;
    collateralPriceUsd: number;
    collateralPrecision: number;
    pair: Pair;
    fee: Fee;
  })[];
};

export default function TradePanel({ tradeContainers }: TradePanelProps) {
  const t = useTranslations("Trade-TradePanel");

  const columns: TableColumnProps[] = [
    { id: "type", component: t("type"), allowsSorting: true },
    { id: "pair", component: t("pair"), allowsSorting: true },
    { id: "size", component: t("size"), allowsSorting: true },
    { id: "lev", component: t("lev"), allowsSorting: true },
    { id: "coll", component: t("coll"), allowsSorting: true },
    { id: "openPrice", component: t("open-price"), allowsSorting: true },
    {
      id: "price",
      component: t("price"),
      allowsSorting: true,
    },
    {
      id: "sltp",
      component: "SL/TP",
    },
    { id: "newPnl", component: t("new-pnl"), allowsSorting: true },
    { id: "close", component: t("close") },
  ];

  const pricingCharts = usePricingCharts();
  const {
    isOpen: isCloseTradeModalOpen,
    onOpen: onCloseTradeModalOpen,
    onClose: onCloseTradeModalClose,
    onOpenChange: onCloseTradeModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isUpdateSLTPOpen,
    onOpen: onUpdateSLTPOpen,
    onOpenChange: onUpdateSLTPOpenChange,
  } = useDisclosure();
  const {
    isOpen: isTradeShareOpen,
    onOpen: onTradeShareOpen,
    onOpenChange: onTradeShareOpenChange,
  } = useDisclosure();

  const [
    selectedTradeContainerForTradeShare,
    setSelectedTradeContainerForTradeShare,
  ] = useState<
    | (TradeContainer & {
        collateralType: CollateralTypes;
        collateralPriceUsd: number;
        pair: Pair;
      })
    | null
  >(null);
  const [selectedTradeContainer, setSelectedTradeContainer] = useState<
    | (TradeContainer & {
        collateralType: CollateralTypes;
        collateralPriceUsd: number;
        pair: Pair;
        fee: Fee;
        collateralPrecision: number;
      })
    | null
  >(null);
  const [sltpTradeContainer, setSLTPTradeContainer] = useState<
    | (TradeContainer & {
        collateralType: CollateralTypes;
        collateralPriceUsd: number;
        pair: Pair;
      })
    | null
  >(null);

  const [isConnectorModalOpen, setIsConnectorModalOpen] = useState(false);

  const handleCloseTrade = (key: Key) => {
    const { trader, pairIndex, index, collateral } = JSON.parse(
      key as string,
    ) as {
      trader: Address;
      pairIndex: number;
      index: number;
      collateral: CollateralTypes;
    };

    const exist = tradeContainers.find(
      (container) =>
        container.trade.trader === trader &&
        container.trade.pairIndex === pairIndex &&
        container.trade.index === index &&
        container.collateralType === collateral,
    );

    if (exist) {
      setSelectedTradeContainer(exist);
      onCloseTradeModalOpen();
    }
  };

  const handleUpdateSLTP = (
    tradeContainer: TradeContainer & {
      collateralType: CollateralTypes;
      collateralPriceUsd: number;
      pair: Pair;
    },
  ) => {
    setSLTPTradeContainer(tradeContainer);
    onUpdateSLTPOpen();
  };

  const handleOpenTradeShareModal = (
    tradeContainer: TradeContainer & {
      collateralType: CollateralTypes;
      collateralPriceUsd: number;
      pair: Pair;
    },
  ) => {
    setSelectedTradeContainerForTradeShare(tradeContainer);
    onTradeShareOpen();
  };

  const rows = tradeContainers.map((trade) => ({
    id: JSON.stringify({
      trader: trade.trade.trader,
      pairIndex: trade.trade.pairIndex,
      index: trade.trade.index,
      collateral: trade.collateralType,
    }),
    data: {
      type: {
        sortableAmount: trade.trade.buy ? 0 : 1,
        component: (
          <div
            className={twMerge(
              "flex items-center gap-2 text-sm capitalize",
              trade.trade.buy ? "text-emerald-400" : "text-red-400",
            )}
          >
            <div className="w-[45px]">
              {trade.trade.buy ? t("long") : t("short")}
            </div>
            <Button
              isIconOnly
              variant="light"
              onClick={() => handleOpenTradeShareModal(trade)}
            >
              <Image src={shareIconSrc} alt="share" width={16} height={16} />
            </Button>
          </div>
        ),
      },
      pair: {
        sortableAmount: trade.trade.pairIndex,
        component: (
          <div className="flex justify-start gap-2 text-sm text-stone-200">
            <PairIcon
              from={trade.pair.from}
              to={trade.pair.to}
              width={18}
              height={18}
            />
            <span className="text-nowrap">{`${trade.pair.from}/${trade.pair.to}`}</span>
          </div>
        ),
      },
      size: {
        sortableAmount: Math.ceil(trade.tradeInfo.openInterestBaseAsset),
        component: (
          <div className="text-sm text-stone-200">
            <div className="text-nowrap">
              {`${getPriceStr(trade.tradeInfo.openInterestBaseAsset)} ${trade.collateralType}`}
            </div>
            <div className="text-nowrap">
              {`${getPriceStr((trade.tradeInfo.openInterestBaseAsset * trade.tradeData.collateralPriceUsd) / trade.trade.openPrice)} ${
                trade.pair.to === "USD" ? trade.pair.from : trade.pair.name
              }`}
            </div>
          </div>
        ),
      },
      lev: {
        sortableAmount: trade.trade.leverage,
        component: (
          <div className="text-nowrap text-sm text-stone-200">
            {`${trade.trade.leverage}x`}
          </div>
        ),
      },
      coll: {
        sortableAmount: getPriceStr(
          trade.tradeInfo.openInterestBaseAsset / trade.trade.leverage,
        ),
        component: (
          <div className="text-nowrap text-sm text-stone-200">
            {`${getPriceStr(
              trade.tradeInfo.openInterestBaseAsset / trade.trade.leverage,
            )} ${trade.collateralType}`}
          </div>
        ),
      },
      openPrice: {
        sortableAmount: trade.trade.openPrice,
        component: (
          <div className="w-[150px] text-nowrap text-sm text-stone-200">
            {getPriceStr(trade.trade.openPrice)}
          </div>
        ),
      },
      price: {
        sortableAmount: pricingCharts?.closes?.[trade.trade.pairIndex] || 0,
        component: (
          <div className="w-[150px] text-nowrap text-sm text-stone-200">
            {getPriceStr(pricingCharts?.closes?.[trade.trade.pairIndex] || 0)}
          </div>
        ),
      },
      sltp: {
        component: (
          <Button
            variant="light"
            className="group relative -left-2 -top-1 h-fit flex-col items-start justify-start gap-0 rounded-md px-2 py-1 text-sm text-stone-200"
            onClick={() => handleUpdateSLTP(trade)}
          >
            <div className="text-nowrap text-left leading-[26px]">
              {trade.trade.sl > 0
                ? `SL: ${getPriceStr(trade.trade.sl)}`
                : `LIQ: ${trade?.initialAccFees?.liquidationPrice ? getPriceStr(trade.initialAccFees.liquidationPrice) : "-"}`}
              <EditIcon
                size={24}
                className="inline-block scale-50 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div className="text-nowrap text-left">{`TP: ${getPriceStr(trade.trade.tp)}`}</div>
          </Button>
        ),
      },
      newPnl: {
        sortableAmount: calcGainedBaseAsset(
          trade,
          pricingCharts?.closes?.[trade.trade.pairIndex] || 0,
        ),
        component: (
          <div
            className={twMerge(
              "w-[200px] text-sm",
              calcGainedBaseAsset(
                trade,
                pricingCharts?.closes?.[trade.trade.pairIndex] || 0,
              ) >= 0
                ? "text-emerald-400"
                : "text-red-400",
            )}
          >
            <div className="text-nowrap">
              {`${getPriceStr(
                calcGainedBaseAsset(
                  trade,
                  pricingCharts?.closes?.[trade.trade.pairIndex] || 0,
                ),
              )} ${trade.collateralType}`}
            </div>
            <div className="text-nowrap">
              {`(${getPercentageStr(
                calcGainedBaseAssetPercentage(
                  trade,
                  pricingCharts?.closes?.[trade.trade.pairIndex] || 0,
                ),
              )}%)`}
            </div>
          </div>
        ),
      },
      close: {
        component: (
          <Button
            isIconOnly
            variant="light"
            isLoading={
              isConnectorModalOpen &&
              !!selectedTradeContainer &&
              JSON.stringify({
                trader: trade.trade.trader,
                pairIndex: trade.trade.pairIndex,
                index: trade.trade.index,
                collateral: trade.collateralType,
              }) ===
                JSON.stringify({
                  trader: selectedTradeContainer.trade.trader,
                  pairIndex: selectedTradeContainer.trade.pairIndex,
                  index: selectedTradeContainer.trade.index,
                  collateral: selectedTradeContainer.collateralType,
                })
            }
            onClick={() =>
              handleCloseTrade(
                JSON.stringify({
                  trader: trade.trade.trader,
                  pairIndex: trade.trade.pairIndex,
                  index: trade.trade.index,
                  collateral: trade.collateralType,
                }),
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
        classNames={{
          base: "h-full overflow-auto",
          thead: "bg-tizz-background",
          th: "!rounded-none",
          tr: "!rounded-none hover:bg-neutral-700/5",
          emptyWrapper: "h-[250px]",
        }}
        EmptyContent={<div>{t("no-opened-trades")}</div>}
      />
      {sltpTradeContainer &&
        pricingCharts &&
        pricingCharts.closes?.[sltpTradeContainer.trade.pairIndex] && (
          <SLTPUpdateModal
            tradeContainer={sltpTradeContainer}
            currentPrice={
              pricingCharts.closes?.[sltpTradeContainer.trade.pairIndex]
            }
            isOpen={isUpdateSLTPOpen}
            onOpenChange={onUpdateSLTPOpenChange}
          />
        )}
      {selectedTradeContainer &&
        pricingCharts &&
        pricingCharts.closes?.[selectedTradeContainer.trade.pairIndex] && (
          <CloseTradeModal
            tradeContainer={selectedTradeContainer}
            currentPrice={
              pricingCharts.closes?.[selectedTradeContainer.trade.pairIndex]
            }
            onConnectorModalOpenChange={setIsConnectorModalOpen}
            isOpen={isCloseTradeModalOpen}
            onClose={onCloseTradeModalClose}
            onOpenChange={onCloseTradeModalOpenChange}
          />
        )}
      {selectedTradeContainerForTradeShare &&
        pricingCharts &&
        pricingCharts.closes?.[
          selectedTradeContainerForTradeShare.trade.pairIndex
        ] && (
          <ShareTradeModal
            tradeInfo={{
              pairName: selectedTradeContainerForTradeShare.pair.name,
              buy: selectedTradeContainerForTradeShare.trade.buy,
              leverage: selectedTradeContainerForTradeShare.trade.leverage,
              pnl: calcGainedBaseAsset(
                selectedTradeContainerForTradeShare,
                pricingCharts?.closes?.[
                  selectedTradeContainerForTradeShare.trade.pairIndex
                ] || 0,
              ),
              pnlPercentageStr: getPercentageStr(
                calcGainedBaseAssetPercentage(
                  selectedTradeContainerForTradeShare,
                  pricingCharts?.closes?.[
                    selectedTradeContainerForTradeShare.trade.pairIndex
                  ] || 0,
                ),
              ),
              openPrice: selectedTradeContainerForTradeShare.trade.openPrice,
              lastPrice:
                pricingCharts.closes?.[
                  selectedTradeContainerForTradeShare.trade.pairIndex
                ],
            }}
            isOpen={isTradeShareOpen}
            onOpenChange={onTradeShareOpenChange}
          />
        )}
    </>
  );
}
