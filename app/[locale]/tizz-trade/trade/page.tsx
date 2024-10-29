"use client";

import { useMemo, useState, Key } from "react";
import { useChainId } from "wagmi";
import { useTranslations } from "next-intl";

import { useTradeState } from "@/tizz-trade-hooks/useTradeState";
import { useTradingVariables } from "@/tizz-trade-hooks/useTradingVariables";
import { usePricingCharts } from "@/tizz-trade-hooks/usePricingCharts";
import { usePricesBefore24h } from "@/tizz-trade-hooks/usePricesBefore24h";
import { useEvent } from "@/tizz-trade-hooks/useEvent";

import PairControlPanel from "@/tizz-trade-components/TradeWidgets/TVChart/PairControlPanel";
import TVChartContainer from "@/tizz-trade-components/TradeWidgets/TVChart/TVChartContainer";

import BigTabs from "@/components/tabs/BigTabs/BigTabs";
import { TabItem } from "@/components/tabs/BaseTabs/BaseTabs";
import TradeHistoryPanel from "@/tizz-trade-components/TradeWidgets/TradeHistoryPanel/TradeHistoryPanel";
import PairInfoBar from "@/tizz-trade-components/TradeWidgets/TVChart/PairInfoBar";

export default function TradePage() {
  const t = useTranslations("Trade-TradePage");
  const bigTabItems: TabItem[] = [
    {
      id: "chart",
      label: t("chart"),
    },
    {
      id: "histories",
      label: t("histories"),
    },
  ];
  useEvent();
  const chainId = useChainId();
  const { tradeState, changeTradeState } = useTradeState();

  const tradingVariable = useTradingVariables(
    chainId,
    tradeState.collateralType,
  );
  const pricesBefore = usePricesBefore24h();
  const chart = usePricingCharts();

  const [tab, setTab] = useState<"chart" | "histories">("chart");

  const handleChangeTab = (value: Key) => {
    setTab(value as "chart" | "histories");
  };

  const handleSelectFavoritePair = (pairIndex: number) => {
    if (tradeState.favoritePairIndexes.includes(pairIndex)) {
      changeTradeState({
        ...tradeState,
        favoritePairIndexes: [
          ...tradeState.favoritePairIndexes.filter((idx) => idx !== pairIndex),
        ],
      });
    } else {
      changeTradeState({
        ...tradeState,
        favoritePairIndexes: [...tradeState.favoritePairIndexes, pairIndex],
      });
    }
  };

  const handleChangeSelectedPairIndex = (pairIndex: number) => {
    changeTradeState({
      ...tradeState,
      pairIndex,
    });
  };

  const pairs = useMemo(() => {
    if (!tradingVariable || !chart || !pricesBefore) {
      return [];
    }

    return (
      tradingVariable.pairs.map((pair, index) => ({
        ...pair,
        price:
          chart.closes?.[index] !== undefined ? chart.closes?.[index] : null,
        percentage:
          chart.closes?.[index] !== undefined &&
          pricesBefore[index] !== undefined
            ? ((chart.closes?.[index] - pricesBefore[index]!) /
                chart.closes?.[index]) *
              100
            : null,
      })) || []
    );
  }, [tradingVariable, pricesBefore, chart]);

  const openInterests = useMemo(() => {
    if (!tradingVariable) {
      return [];
    }

    return tradingVariable.openInterests;
  }, [tradingVariable]);

  const selectedPairIndex = tradeState.pairIndex;
  const selectedPair = pairs?.[selectedPairIndex];
  const openInterest = openInterests?.[selectedPairIndex];
  const nextFundingFeeApplyTime = tradingVariable?.nextFundingFeeApplyTime || 0;

  return (
    <>
      {openInterest && (
        <PairControlPanel
          pairs={pairs}
          openInterest={openInterest}
          favoritePairIndexs={tradeState.favoritePairIndexes}
          selectedPairIndex={selectedPairIndex}
          onChangePairIndex={handleChangeSelectedPairIndex}
          onSelectFavorite={handleSelectFavoritePair}
          nextFundingFeeApplyTime={nextFundingFeeApplyTime}
        />
      )}

      <div className="w-full md:hidden">
        <BigTabs
          tabs={bigTabItems}
          selectedKey={tab}
          onSelectionChange={handleChangeTab}
        />
      </div>

      {selectedPair && tab === "chart" ? (
        <TVChartContainer
          name={selectedPair.name}
          pairIndex={selectedPair.pairIndex}
          groupIndex={selectedPair.groupIndex}
        />
      ) : null}

      {tab === "histories" && <TradeHistoryPanel />}

      <div className="w-full md:hidden">
        {openInterest && (
          <PairInfoBar
            openInterest={openInterest}
            selectedPair={selectedPair}
            nextFundingFeeApplyTime={nextFundingFeeApplyTime}
          />
        )}
      </div>
    </>
  );
}
