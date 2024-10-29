"use client";

import { useState, useMemo, Key, ReactNode } from "react";
import { useAccount, useChainId } from "wagmi";
import { LimitOrder } from "@gainsnetwork/sdk";
import { useTranslations } from "next-intl";

import SmallTab from "@/components/tabs/SmallTab/SmallTab";
import BaseTabs, { TabItem } from "@/components/tabs/BaseTabs/BaseTabs";

import { useTradingVariables } from "@/tizz-trade-hooks/useTradingVariables";
import { useUserTradingHistories } from "@/tizz-trade-hooks/useUserTradingHistories";

import { isTradeContainer } from "@/utils/index";
import { CollateralTypes } from "@/utils/tizz";
import { TradeContainer } from "@/types/index";

import TradeControlBar from "./TradeControlBar";
import WalletConnectStatus from "./WalletConnectStatus";
import TradePanel from "./TradePanel";
import OrdersPanel from "./OrdersPanel";
import HistoriesPanel from "./HistoriesPanel";

export default function TradeControlPanel() {
  const t = useTranslations("Trade-TradeControlPanel");
  const { isConnected, address } = useAccount();
  const chainId = useChainId();

  const tabItems: TabItem[] = [
    {
      id: "user",
      label: t("personal"),
    },
    {
      id: "team",
      label: t("team"),
    },
  ];

  const tradingHistories = useUserTradingHistories(chainId, address);

  const usdtTradingVariable = useTradingVariables(
    chainId,
    CollateralTypes.USDT,
  );

  const wbtcTradingVariable = useTradingVariables(
    chainId,
    CollateralTypes.WBTC,
  );

  const [selectedTab, setSelectedTab] = useState<string>("trades");
  const [tradeMode, setTradeMode] = useState<"team" | "user">("user");

  const allTradeContainers = useMemo(() => {
    if (!address) {
      return [];
    }

    const wbtcTrades = wbtcTradingVariable
      ? [
          ...wbtcTradingVariable.allTrades
            .filter((trade): trade is TradeContainer => {
              if (!isTradeContainer(trade)) {
                return false;
              }

              if (
                trade.trade.pairIndex === undefined ||
                wbtcTradingVariable.pairs.length < trade.trade.pairIndex
              ) {
                return false;
              }

              if (
                wbtcTradingVariable.pairs[trade.trade.pairIndex].groupIndex ===
                  undefined ||
                wbtcTradingVariable.fees.length <
                  wbtcTradingVariable.pairs[trade.trade.pairIndex].groupIndex
              ) {
                return false;
              }

              return true;
            })
            .map((trade) => ({
              ...trade,
              collateralType: CollateralTypes.WBTC,
              collateralPriceUsd: wbtcTradingVariable.prices.collateralPriceUsd,
              collateralPrecision:
                wbtcTradingVariable.collateralConfig.precision,
              pair: wbtcTradingVariable.pairs[trade.trade.pairIndex],
              fee: wbtcTradingVariable.fees[
                wbtcTradingVariable.pairs[trade.trade.pairIndex].groupIndex
              ],
            })),
        ]
      : [];
    const usdtTrades = usdtTradingVariable
      ? [
          ...usdtTradingVariable.allTrades
            .filter((trade): trade is TradeContainer => {
              if (!isTradeContainer(trade)) {
                return false;
              }

              if (
                trade.trade.pairIndex === undefined ||
                usdtTradingVariable.pairs.length < trade.trade.pairIndex
              ) {
                return false;
              }

              if (
                usdtTradingVariable.pairs[trade.trade.pairIndex].groupIndex ===
                  undefined ||
                usdtTradingVariable.fees.length <
                  usdtTradingVariable.pairs[trade.trade.pairIndex].groupIndex
              ) {
                return false;
              }

              return true;
            })
            .map((trade) => ({
              ...trade,
              collateralType: CollateralTypes.USDT,
              collateralPriceUsd: usdtTradingVariable.prices.collateralPriceUsd,
              collateralPrecision:
                usdtTradingVariable.collateralConfig.precision,
              pair: usdtTradingVariable.pairs[trade.trade.pairIndex],
              fee: usdtTradingVariable.fees[
                usdtTradingVariable.pairs[trade.trade.pairIndex].groupIndex
              ],
            })),
        ]
      : [];

    return [...usdtTrades, ...wbtcTrades].filter(
      (trade) => trade.trade.trader === address,
    );
  }, [address, usdtTradingVariable, wbtcTradingVariable]);

  const allLimitOrders = useMemo(() => {
    if (!address) {
      return [];
    }

    const wbtcTrades = wbtcTradingVariable
      ? [
          ...wbtcTradingVariable.allTrades
            .filter((trade): trade is LimitOrder => !isTradeContainer(trade))
            .map((trade) => ({
              ...trade,
              collateralType: CollateralTypes.WBTC,
              collateralPriceUsd: wbtcTradingVariable.prices.collateralPriceUsd,
              pair: wbtcTradingVariable.pairs[trade.pairIndex],
            })),
        ]
      : [];
    const usdtTrades = usdtTradingVariable
      ? [
          ...usdtTradingVariable.allTrades
            .filter((trade): trade is LimitOrder => !isTradeContainer(trade))
            .map((trade) => ({
              ...trade,
              collateralType: CollateralTypes.USDT,
              collateralPriceUsd: usdtTradingVariable.prices.collateralPriceUsd,
              pair: usdtTradingVariable.pairs[trade.pairIndex],
            })),
        ]
      : [];

    return [...usdtTrades, ...wbtcTrades].filter(
      (trade) => trade.trader === address,
    );
  }, [address, usdtTradingVariable, wbtcTradingVariable]);

  const allHistories = useMemo(() => {
    if (!address || !tradingHistories) {
      return [];
    }

    return tradingHistories
      .filter((history) => history.action === "TradeClosedMarket")
      .filter((history) => history.address === address)
      .sort((a, b) => {
        if (new Date(a.date) > new Date(b.date)) {
          return -1;
        } else if (new Date(a.date) < new Date(b.date)) {
          return 1;
        } else {
          return 0;
        }
      });
  }, [address, tradingHistories]);

  const handleChangeTab = (value: Key) => {
    setSelectedTab(value as string);
  };

  const tabs = [
    {
      id: "trades",
      label: `${tradeMode === "team" ? t("team-trades") : t("trades")} (${allTradeContainers.length})`,
      className: "w-full",
    },
    {
      id: "orders",
      label: `${tradeMode === "team" ? t("team-orders") : t("orders")} (${allLimitOrders.length})`,
      className: "w-full",
    },
    {
      id: "history",
      label: `${tradeMode === "team" ? t("team-history") : t("history")}`,
      className: "w-full",
    },
  ];

  const components: Record<string, ReactNode> = {
    trades: <TradePanel tradeContainers={allTradeContainers} />,
    orders: <OrdersPanel limitOrders={allLimitOrders} />,
    history: <HistoriesPanel histories={allHistories} />,
  };

  return (
    <>
      <BaseTabs
        variant="bordered"
        tabs={tabItems}
        selectedKey={tradeMode}
        onSelectionChange={handleChangeTab}
        classNames={{
          cursor: "!rounded-md !border-zinc-800 !bg-gray-900",
          tabList:
            "md:hidden rounded !border-neutral-800 p-1 gap-0 border-[1px]",
          tabContent: "text-sm font-bold text-gray-400 p-1",
        }}
      />
      <div className="flex h-10 w-full justify-between border-b !border-gray-800 pr-3">
        <div className="flex-grow">
          <SmallTab
            tabs={tabs}
            selectedKey={selectedTab}
            classNames={{ tab: "border-r-0" }}
            onSelectionChange={handleChangeTab}
          />
        </div>
        <TradeControlBar
          tradeMode={tradeMode}
          onChangeTradeMode={setTradeMode}
        />
      </div>
      <div className="relative h-full min-h-[200px] w-full overflow-auto">
        {isConnected === true ? (
          components[selectedTab]
        ) : (
          <WalletConnectStatus />
        )}
      </div>
    </>
  );
}
