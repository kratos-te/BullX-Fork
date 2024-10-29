"use client";

import { useState, Key, ChangeEvent, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useChainId } from "wagmi";
import { twMerge } from "tailwind-merge";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import BaseSwitch from "@/components/switchs/BaseSwitch/BaseSwitch";
import BaseTabs, { TabItem } from "@/components/tabs/BaseTabs/BaseTabs";
import TokenSelector from "@/components/selects/TokenSelector/TokenSelector";
import DataTable, {
  TableColumnProps,
  TableRowProps,
} from "@/components/tables/DataTableV2";

import { usePricingCharts } from "@/tizz-trade-hooks/usePricingCharts";
import { usePricesBefore24h } from "@/tizz-trade-hooks/usePricesBefore24h";
import { useTradingVariables } from "@/tizz-trade-hooks/useTradingVariables";
import { useTradeHistory24h } from "@/tizz-trade-hooks/useTradeHistory24h";
import { useGetVolume } from "@/tizz-trade-hooks/useGetVolume";
import { useGetPairsVolume } from "@/tizz-trade-hooks/useGetPairsVolume";

import { tizzCollateralItems } from "@/tizz-trade-components/TradeWidgets/TradeSidebar/CollateralPanel/CollateralPanel";
import { CollateralTypes } from "@/utils/tizz";

import { formatNumber, getPercentageStr, getPriceStr } from "@/utils/price";
import PairIcon from "@/components/icons/PairIcon";
import {
  GroupPair,
  Group,
  GroupCard,
} from "@/tizz-trade-components/StatsWidget/GroupCard";
import HistoriesPanel from "@/tizz-trade-components/TradeWidgets/TradeControlPanel/HistoriesPanel";

export default function Page() {
  const t = useTranslations("Trade-Stats");

  const chainId = useChainId();

  const wbtcVolume = useGetVolume(chainId, CollateralTypes.WBTC);
  const usdtVolume = useGetVolume(chainId, CollateralTypes.USDT);

  const wbtcPairsVolume = useGetPairsVolume(chainId, CollateralTypes.WBTC);
  const usdtPairsVolume = useGetPairsVolume(chainId, CollateralTypes.USDT);

  const modeTabItems: TabItem[] = [
    {
      id: "pairs",
      label: "Pairs",
    },
    {
      id: "groups",
      label: "Groups",
    },
    {
      id: "dailyTrades",
      label: "Daily Trades",
    },
  ];

  const items = [
    {
      id: "all-time-volume",
      label: t("all-time-volume"),
      value: `$${getPriceStr((wbtcVolume?.all?.volume || 0) + (usdtVolume?.all?.volume || 0))}`,
    },
    {
      id: "daily-volume",
      label: t("daily-volume"),
      value: `$${getPriceStr((wbtcVolume?.daily?.volume || 0) + (usdtVolume?.daily?.volume || 0))}`,
    },
    {
      id: "dailyTrades",
      label: t("daily-trades"),
      value: `${getPriceStr((wbtcVolume?.daily?.count || 0) + (usdtVolume?.daily?.count || 0))}`,
    },
  ];

  const pairsColumn: TableColumnProps[] = [
    {
      id: "name",
      component: "Name",
    },
    {
      id: "price",
      component: "Price",
    },
    { id: "change", component: "Change" },
    { id: "openInterestLong", component: "Open Interest (Long)" },
    { id: "openInterestShort", component: "Open Interest (Short)" },
    { id: "dailyVolume", component: "24h Volume" },
  ];

  const [selectedModeTabKey, setSelectedModeTabKey] = useState<string>(
    modeTabItems[0].id,
  );
  const [collateralType, setCollateralType] = useState<CollateralTypes>(
    CollateralTypes.WBTC,
  );
  const [isShowAll, setIsShowAll] = useState(false);

  const tradingVariable = useTradingVariables(chainId, collateralType);
  const pricesBefore = usePricesBefore24h();
  const chart = usePricingCharts();
  const tradeHistory24h = useTradeHistory24h(chainId, CollateralTypes.USDT);

  const handleModeTabSelectionChange = (value: Key) => {
    setSelectedModeTabKey(value as string);
  };

  const handleChangeCollateralType = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value.trim() !== "") {
      setCollateralType(e.target.value as CollateralTypes);
    }
  };

  const pairsRow = useMemo(() => {
    if (!tradingVariable || !chart || !pricesBefore) {
      return [];
    }

    const pairs = tradingVariable.pairs;

    const pairVolumeMap: Record<string, number> = {};

    switch (collateralType) {
      case CollateralTypes.USDT: {
        usdtPairsVolume?.forEach(
          (pair) => (pairVolumeMap[pair.pair] = pair.volume),
        );
      }
      case CollateralTypes.WBTC: {
        wbtcPairsVolume?.forEach(
          (pair) => (pairVolumeMap[pair.pair] = pair.volume),
        );
      }
      default: {
      }
    }

    return tradingVariable.openInterests.map((oi, index) => {
      return {
        id: `${index}`,
        data: {
          name: {
            component: pairs[index] ? (
              <div className="flex gap-2">
                <PairIcon
                  from={pairs[index].from}
                  to={pairs[index].to}
                  height={18}
                  width={18}
                />
                <span>{pairs[index].name}</span>
              </div>
            ) : (
              "-"
            ),
          },
          price: {
            component:
              chart.closes?.[index] !== undefined
                ? getPriceStr(chart.closes?.[index])
                : "-",
          },
          change: {
            component:
              chart.closes?.[index] !== undefined &&
              chart.closes?.[index] > 0 &&
              pricesBefore[index] !== undefined ? (
                <div
                  className={twMerge(
                    "text-nowrap text-sm",
                    chart.closes[index] - pricesBefore[index]! > 0
                      ? "text-emerald-400"
                      : "text-red-400",
                  )}
                >
                  {`${getPercentageStr(
                    ((chart.closes[index] - pricesBefore[index]!) /
                      chart.closes[index]) *
                      100,
                  )} %`}
                </div>
              ) : (
                "-"
              ),
          },
          openInterestLong: {
            component: oi
              ? `${formatNumber(oi.long)} / ${formatNumber(oi.max)}`
              : "-",
          },
          openInterestShort: {
            component: oi
              ? `${formatNumber(oi.short)} / ${formatNumber(oi.max)}`
              : "-",
          },
          dailyVolume: {
            component: `${getPriceStr(pairVolumeMap[pairs[index]?.name] || 0)} ${collateralType}`,
          },
        },
      } as TableRowProps;
    });
  }, [
    chart,
    collateralType,
    pricesBefore,
    tradingVariable,
    usdtPairsVolume,
    wbtcPairsVolume,
  ]);

  const groupCards: Group[] = useMemo(() => {
    if (!tradingVariable) {
      return [];
    }

    const getGroupPairs = (groupIndex: number) => {
      const groupPairs: GroupPair[] = [];

      tradingVariable?.pairInfos?.borrowingFees?.pairs?.forEach(
        (pair, index) => {
          if (pair.groups.length === 0) {
            return;
          }

          const pairGroup = pair.groups[pair.groups.length - 1];

          if (
            groupIndex === pairGroup.groupIndex &&
            tradingVariable?.pairs?.[index]
          ) {
            groupPairs.push({
              from: tradingVariable.pairs[index].from,
              to: tradingVariable.pairs[index].to,
              name: tradingVariable.pairs[index].name,
            });
          }
        },
      );

      return groupPairs;
    };

    return tradingVariable?.pairInfos?.borrowingFees?.groups?.map(
      (group, index) => {
        return {
          groupIndex: index,
          oiLong: group.oiLong,
          oiShort: group.oiShort,
          oiMax: group.maxOi,
          pairs: getGroupPairs(index),
        };
      },
    );
  }, [tradingVariable]);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-semibold leading-[38px] text-white md:text-3xl">
        Trade Stats
      </p>

      <div className="flex items-center justify-between gap-6">
        {items.map((item) => (
          <BaseCard
            key={item.id}
            classNames={{
              base: "flex flex-col gap-1 py-4 px-6 border border-gray-800 bg-neutral-900 rounded-lg h-fit w-full",
            }}
          >
            <span className="text-sm capitalize text-gray-500">
              {item.label}
            </span>
            <span className="text-3xl font-semibold text-white">
              {item.value}
            </span>
          </BaseCard>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <BaseTabs
          variant="bordered"
          tabs={modeTabItems}
          selectedKey={selectedModeTabKey}
          onSelectionChange={handleModeTabSelectionChange}
          classNames={{
            base: "w-fit",
            tab: "w-[100px]",
            cursor: "!bg-neutral-800 !rounded-md !border-zinc-800",
            tabList: "rounded !border-neutral-800 p-1 gap-0 border-[1px]",
            tabContent:
              "text-sm text-gray-400 p-1 group-data-[selected=true]:text-white",
          }}
        />

        {selectedModeTabKey === "dailyTrades" ? (
          <BaseSwitch
            label="Show All"
            isSelected={isShowAll}
            setIsSelected={setIsShowAll}
          />
        ) : (
          <TokenSelector
            items={tizzCollateralItems}
            selectedKeys={[collateralType]}
            onChange={handleChangeCollateralType}
          />
        )}
      </div>

      {selectedModeTabKey === "pairs" && (
        <DataTable
          columns={pairsColumn}
          rows={pairsRow}
          classNames={{
            wrapper: "rounded-lg border border-gray-800",
            base: "h-full overflow-auto",
            thead: "bg-tizz-background",
            th: "!rounded-none",
            tr: "!rounded-none",
            emptyWrapper: "h-[250px]",
          }}
        />
      )}

      {selectedModeTabKey === "groups" && (
        <div className="flex flex-wrap items-center gap-2">
          {groupCards.slice(1).map((groupCard) => (
            <GroupCard
              key={groupCard.groupIndex}
              group={groupCard}
              collateralType={collateralType}
            />
          ))}
        </div>
      )}

      {selectedModeTabKey === "dailyTrades" && (
        <HistoriesPanel
          histories={tradeHistory24h || []}
          isTeamView
          isShowAll={isShowAll}
          classNames={{ wrapper: "border border-stroke rounded-xl" }}
        />
      )}
    </div>
  );
}
