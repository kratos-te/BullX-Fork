"use client";

import { useState, Key, useEffect, ChangeEvent, useCallback } from "react";
import { SliderValue } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { PositionType } from "@gainsnetwork/sdk";
import { useAccount, useChainId } from "wagmi";
import { useTranslations } from "next-intl";
import { CollateralTypes, tizzContractAddresses } from "@/utils/tizz";

import { useTradeState } from "@/tizz-trade-hooks/useTradeState";
import { useOpenLimitOrdersCount } from "@/tizz-trade-hooks/useOpenLimitOrdersCount";
import { useOpenTradesCount } from "@/tizz-trade-hooks/useOpenTradesCount";
import { useTradingVariables } from "@/tizz-trade-hooks/useTradingVariables";
import { usePricingCharts } from "@/tizz-trade-hooks/usePricingCharts";
import { useTokenBalance } from "@/tizz-trade-hooks/useTokenBalance";

import BigTabs from "@/components/tabs/BigTabs/BigTabs";
import BaseTabs, { TabItem } from "@/components/tabs/BaseTabs/BaseTabs";
import BorderedInput from "@/components/inputs/BorderedInput/BorderedInput";

import CollateralPanel, {
  minimumCollateralUsd,
} from "@/tizz-trade-components/TradeWidgets/TradeSidebar/CollateralPanel/CollateralPanel";
import LeveragePanel from "@/tizz-trade-components/TradeWidgets/TradeSidebar/LeveragePanel";
import TradeDetailPanel from "@/tizz-trade-components/TradeWidgets/TradeSidebar/TradeDetailPanel";
import SLTPPanel from "@/tizz-trade-components/TradeWidgets/TradeSidebar/SLTPPanel";
import TradeOpenButton from "@/tizz-trade-components/TradeWidgets/TradeSidebar/TradeOpenButton";

import { TradeOrderType } from "@/types/index";
import { getPriceStr } from "@/utils/price";
import { polygonMumbai } from "viem/chains";

import { Address } from "viem";

export default function TradeSidebar() {
  const t = useTranslations("Trade-TradeSidebar");

  const orderTypeLabel: Record<TradeOrderType, string> = {
    market: t("market"),
    limit: t("limit"),
    stop: t("stop"),
  };

  const positionTypeLabel: Record<PositionType, string> = {
    LONG: t("long"),
    SHORT: t("short"),
  };

  const tabItems: TabItem[] = [
    {
      id: PositionType.LONG,
      label: t("long"),
    },
    {
      id: PositionType.SHORT,
      label: t("short"),
    },
  ];

  const bigTabItems: TabItem[] = [
    {
      id: "market",
      label: t("market"),
    },
    {
      id: "limit",
      label: t("limit"),
    },
    {
      id: "stop",
      label: t("stop"),
    },
  ];

  const chainId = useChainId();
  const account = useAccount();
  const { tradeState, changeTradeState } = useTradeState();
  const { balance: collateralBalance, precision: collateralPrecision } =
    useTokenBalance({
      contractAddress: tizzContractAddresses[tradeState.collateralType]
        .DAI as Address,
      ownerAddress: account.address,
    });
  const { count: openLimitOrdersCount } = useOpenLimitOrdersCount(
    tradeState.pairIndex,
    tradeState.collateralType,
  );
  const { count: openTradesCount } = useOpenTradesCount(
    tradeState.pairIndex,
    tradeState.collateralType,
  );

  const tradingVariable = useTradingVariables(
    chainId,
    tradeState.collateralType,
  );
  const chart = usePricingCharts();

  const [position, setPosition] = useState<PositionType>(PositionType.LONG);
  const [orderType, setOrderType] = useState<TradeOrderType>("market");
  const [collateralAmount, setCollateralAmount] = useState("0");
  const [limitPrice, setLimitPrice] = useState("0");
  const [leverage, setLeverage] = useState<number>(0);
  const [stopLoss, setStopLoss] = useState<string>("");
  const [takeProfit, setTakeProfit] = useState<string>("");
  const [slippage, setSlippage] = useState("1");

  useEffect(() => {
    if (!tradingVariable?.prices?.collateralPriceUsd) {
      return;
    }

    setCollateralAmount(
      getPriceStr(
        minimumCollateralUsd / tradingVariable.prices.collateralPriceUsd,
      ),
    );
  }, [tradingVariable?.prices]);

  const handleChangeAmount = (amount: string) => {
    setCollateralAmount(amount);
  };

  const handleChangeCollateralType = (type: CollateralTypes) => {
    changeTradeState({ ...tradeState, collateralType: type });
  };

  const handleChangeOrderType = (value: Key) => {
    setOrderType(value as TradeOrderType);
    setLimitPrice(chart ? chart.closes?.[tradeState.pairIndex] + "" : "0");
  };

  const handleChangePosition = (value: Key) => {
    setPosition(value as PositionType);
  };

  const handleChangeLeverage = useCallback((value: SliderValue) => {
    setLeverage(value as number);
  }, []);

  const handleChangeLimitPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value)) {
      setLimitPrice(e.target.value);
    }
  };

  const balance =
    collateralBalance !== undefined && collateralPrecision !== undefined
      ? Number(collateralBalance) / collateralPrecision
      : 0;

  const collateralLow = tradingVariable?.prices?.collateralPriceUsd
    ? minimumCollateralUsd / tradingVariable.prices.collateralPriceUsd
    : 0;

  const collateralHigh = tradingVariable?.maxPosBaseAsset || 0;
  const collateralConfig = tradingVariable?.collateralConfig;
  const maxTradesPerPair = tradingVariable?.maxTradesPerPair || 0;

  const groupIndex = tradingVariable?.pairs?.[tradeState.pairIndex]?.groupIndex;

  const minLeverage =
    groupIndex !== undefined
      ? tradingVariable?.groups?.[groupIndex]?.minLeverage || 0
      : 0;
  const maxLeverage =
    groupIndex !== undefined
      ? tradingVariable?.groups?.[groupIndex]?.maxLeverage || 0
      : 0;

  const collateralPriceUsd = tradingVariable?.prices?.collateralPriceUsd || 1;

  const pair = tradingVariable?.pairs?.[tradeState.pairIndex] || null;
  const fee =
    tradingVariable && groupIndex !== undefined
      ? tradingVariable?.fees?.[groupIndex]
      : null;

  const price = chart?.closes?.[tradeState.pairIndex] || 0;

  const minLevPosUsd =
    tradingVariable && groupIndex !== undefined
      ? tradingVariable?.fees?.[groupIndex]?.minLevPosUsd
      : 0;
  const pairOi = tradingVariable?.openInterests?.[tradeState.pairIndex] || null;
  const pairGroups =
    tradingVariable?.pairInfos?.borrowingFees?.pairs?.[tradeState.pairIndex]
      ?.groups || [];
  const pairGroupIndex =
    pairGroups.length > 0
      ? pairGroups[pairGroups.length - 1]?.groupIndex || 0
      : 0;
  const groupOi =
    tradingVariable?.pairInfos?.borrowingFees?.groups?.[pairGroupIndex] || null;

  const minLevPosDai = minLevPosUsd / collateralPriceUsd;
  const collateralAmountNum = !Number.isNaN(+collateralAmount)
    ? +collateralAmount
    : 0;
  const limitPriceNum = !Number.isNaN(+limitPrice) ? +limitPrice : 0;
  const openPrice =
    orderType !== "market" && !Number.isNaN(+limitPrice) ? +limitPrice : price;

  const sltpPrice = orderType === "market" ? price : limitPriceNum;

  const slP =
    !Number.isNaN(stopLoss) && sltpPrice
      ? ((position === PositionType.LONG ? 1 : -1) *
          (+stopLoss - sltpPrice) *
          100 *
          leverage) /
        sltpPrice
      : -101;

  const tpP =
    !Number.isNaN(takeProfit) && sltpPrice
      ? ((position === PositionType.LONG ? 1 : -1) *
          (+takeProfit - sltpPrice) *
          100 *
          leverage) /
        sltpPrice
      : -1;

  const tradeOpenButtonLabel = `${chainId === polygonMumbai.id ? "Practice" : ""} ${orderTypeLabel[orderType]} ${positionTypeLabel[position]}`;
  const tradeOpenButtonClassName =
    position === PositionType.LONG ? "bg-amber-300" : "bg-red-500 text-white";

  let disabledBy: string | undefined = undefined;

  if (Number.isNaN(+collateralAmount)) {
    disabledBy = t("invalid-format-of-collateral-amount");
  }

  if (collateralAmountNum > balance) {
    disabledBy = t("balance-isnt-enough");
  }

  if (
    collateralAmountNum < collateralLow ||
    collateralAmountNum > collateralHigh
  ) {
    disabledBy = t("invalid-amount-of-collateral");
  }

  if (leverage < minLeverage || leverage > maxLeverage) {
    disabledBy = t("invalid-leverage");
  }

  if (minLevPosDai > leverage * collateralAmountNum) {
    disabledBy = `${t("notional-value")} < ${getPriceStr(minLevPosDai)} ${tradeState.collateralType}`;
  }

  if (
    !pairOi ||
    (position === PositionType.LONG ? pairOi.long : pairOi.short) +
      leverage * +collateralAmount >
      pairOi.max
  ) {
    disabledBy = t("above-pair-max-oi");
  }

  if (
    !groupOi ||
    (position === PositionType.LONG ? groupOi.oiLong : groupOi.oiShort) +
      leverage * +collateralAmount >
      groupOi.maxOi
  ) {
    disabledBy = t("above-group-max-oi");
  }

  if (
    (position === PositionType.LONG &&
      orderType === "limit" &&
      price < limitPriceNum) ||
    (position === PositionType.SHORT &&
      orderType === "limit" &&
      price > limitPriceNum) ||
    (position === PositionType.LONG &&
      orderType === "stop" &&
      price > limitPriceNum) ||
    (position === PositionType.SHORT &&
      orderType === "stop" &&
      price < limitPriceNum)
  ) {
    disabledBy = t("wrong-limit-price");
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

  if (!Number.isNaN(takeProfit) && +takeProfit <= 0) {
    disabledBy = t("take-profit-is-unreachable");
  }

  if (+slippage === 0) {
    disabledBy = t("slippage-is-0");
  }

  if (openTradesCount + openLimitOrdersCount >= maxTradesPerPair) {
    disabledBy = t("max-trades-reached");
  }

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <BigTabs
        tabs={bigTabItems}
        selectedKey={orderType}
        onSelectionChange={handleChangeOrderType}
      />
      <BaseTabs
        variant="bordered"
        tabs={tabItems}
        selectedKey={position}
        onSelectionChange={handleChangePosition}
        classNames={{
          cursor: twMerge(
            "!rounded-md !border-zinc-800",
            position === PositionType.SHORT ? "!bg-red-500" : "!bg-amber-300",
          ),
          tabList: "rounded !border-neutral-800 p-1 gap-0 border-[1px]",
          tabContent: twMerge(
            "text-sm font-bold text-gray-400 p-1",

            position === PositionType.SHORT
              ? "group-data-[selected=true]:text-white"
              : "group-data-[selected=true]:text-neutral-900",
          ),
        }}
      />
      <CollateralPanel
        chainId={chainId}
        balance={balance}
        minAmount={collateralLow}
        maxAmount={collateralHigh}
        collateralPriceUsd={tradingVariable?.prices.collateralPriceUsd}
        collateralPrecision={tradingVariable?.collateralConfig.precision}
        collateralAmount={collateralAmount}
        collateralType={tradeState.collateralType}
        onChangeAmount={handleChangeAmount}
        onChangeCollateralType={handleChangeCollateralType}
      />
      <LeveragePanel
        minLeverage={minLeverage}
        maxLeverage={maxLeverage}
        leverage={leverage}
        onChange={handleChangeLeverage}
      />

      {orderType !== "market" ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">{t("price")}</span>
            <span className="text-xs text-gray-400">
              Mark: <span className="text-sm text-stone-200">{price}</span>
            </span>
          </div>

          <BorderedInput
            type="text"
            labelPlacement="outside"
            value={limitPrice}
            onChange={handleChangeLimitPrice}
          />
        </div>
      ) : null}

      <SLTPPanel
        price={openPrice}
        leverage={leverage}
        isLong={position === PositionType.LONG}
        stopLoss={stopLoss}
        takeProfit={takeProfit}
        onChangeStopLoss={setStopLoss}
        onChangeTakeProfit={setTakeProfit}
      />

      {collateralConfig && pair && collateralConfig && fee && (
        <TradeOpenButton
          collateralType={tradeState.collateralType}
          collateralConfigPrecision={collateralConfig.precision}
          collateralAmount={+collateralAmount}
          tradeOpenButtonLabel={tradeOpenButtonLabel}
          tradeOpenButtonClassName={tradeOpenButtonClassName}
          disabledBy={disabledBy}
          position={position}
          orderType={orderType}
          collateralConfig={collateralConfig}
          leverage={leverage}
          positionSize={
            (+collateralAmount * leverage) / collateralPriceUsd / price
          }
          pair={pair}
          fee={fee}
          openPrice={openPrice}
          maxSlippage={+slippage}
          stopLoss={+stopLoss}
          takeProfit={+takeProfit}
        />
      )}

      {pair && collateralConfig && fee && (
        <TradeDetailPanel
          position={position}
          price={openPrice}
          collateralType={tradeState.collateralType}
          collateralAmount={+collateralAmount}
          collateralPriceUsd={collateralPriceUsd}
          collateralPrecision={collateralConfig.precision}
          leverage={leverage}
          slippage={slippage}
          onChangeSlippage={setSlippage}
          pair={pair}
          fee={fee}
        />
      )}
    </div>
  );
}
