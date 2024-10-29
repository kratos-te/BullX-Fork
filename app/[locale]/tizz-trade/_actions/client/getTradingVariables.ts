"use client";

import type { TradingVariable, TradeContainer } from "@/types/index";
import {
  BorrowingFee,
  LimitOrder,
  getPairDescription,
} from "@gainsnetwork/sdk";
import { getEndpoints } from "./config";
import { Address } from "viem";
import { CollateralTypes } from "@/utils/tizz";

export function parseTradingVariable(
  old: TradingVariable,
  res: any,
): TradingVariable {
  const lastRefreshed = res.lastRefreshed
    ? new Date(res.lastRefreshed)
    : old.lastRefreshed;
  const refreshId = res.refreshId ? +res.refreshId : old.refreshId;
  const paused = res.paused ? Boolean(res.paused) : old.paused;
  const maxGainP = res.maxGainP ? +res.maxGainP : old.maxGainP;
  const collateralConfig = res.collateralConfig
    ? {
        precision: +res.collateralConfig.precision,
        precisionDelta: +res.collateralConfig.precisionDelta,
        decimals: +res.collateralConfig.decimals,
      }
    : old.collateralConfig;
  const maxPosBaseAsset = res.maxPosBaseAsset
    ? parseFloat(res.maxPosBaseAsset) / collateralConfig.precision
    : old.maxPosBaseAsset;
  const prices = res.prices
    ? {
        tizzPriceCollateral: +res.prices.tizzPriceCollateral,
        tizzPriceUsd: +res.prices.tizzPriceUsd,
        collateralPriceUsd: +res.prices.collateralPriceUsd,
      }
    : old.prices;
  const pairs = res.pairs
    ? (res.pairs as any[]).map((pair, index) => ({
        name: `${pair.from}/${pair.to}`,
        description: getPairDescription(index),
        from: pair.from,
        to: pair.to,
        spreadP: +pair.spreadP / 1e10,
        groupIndex: +pair.groupIndex,
        feeIndex: +pair.feeIndex,
        pairIndex: index,
      }))
    : old.pairs;
  const groups = res.groups
    ? (res.groups as any[]).map((group) => ({
        maxLeverage: +group.maxLeverage,
        minLeverage: +group.minLeverage,
        name: group.name,
      }))
    : old.groups;
  const fees = res.fees
    ? (res.fees as any[]).map((fee) => ({
        closeFeeP: parseFloat(fee.closeFeeP.toString()) / 1e12,
        minLevPosUsd: parseFloat(fee.minLevPosUsd.toString()) / 1e18,
        nftLimitOrderFeeP: parseFloat(fee.nftLimitOrderFeeP.toString()) / 1e12,
        openFeeP: parseFloat(fee.openFeeP.toString()) / 1e12,
        oracleFeeP: BigInt(fee.oracleFeeP),
      }))
    : old.fees;
  const pairInfos = res.pairInfos
    ? {
        maxLeverages: res.pairInfos.maxLeverages,
        pairDepths: (res.pairInfos.pairDepths as any[]).map((pairDepth) => ({
          onePercentDepthAboveUsd: +pairDepth.onePercentDepthAboveUsd,
          onePercentDepthBelowUsd: +pairDepth.onePercentDepthBelowUsd,
        })),
        borrowingFees: {
          pairs: (res.pairInfos.borrowingFees.pairs as any[]).map(
            (pair) =>
              ({
                groups: (pair.groups as any[]).map((group) => ({
                  groupIndex: +group.groupIndex,
                  initialAccFeeLong: parseFloat(group.initialAccFeeLong) / 1e10,
                  initialAccFeeShort:
                    parseFloat(group.initialAccFeeShort) / 1e10,
                  prevGroupAccFeeLong:
                    parseFloat(group.prevGroupAccFeeLong) / 1e10,
                  prevGroupAccFeeShort:
                    parseFloat(group.prevGroupAccFeeShort) / 1e10,
                  pairAccFeeLong: parseFloat(group.pairAccFeeLong) / 1e10,
                  pairAccFeeShort: parseFloat(group.pairAccFeeShort) / 1e10,
                  block: +group.block,
                })),
                feePerBlock: parseFloat(pair.feePerBlock) / 1e10,
                accFeeLong: parseFloat(pair.accFeeLong) / 1e10,
                accFeeShort: parseFloat(pair.accFeeShort) / 1e10,
                accLastUpdatedBlock: +pair.accLastUpdatedBlock,
                maxOi: +pair.maxOi,
                lastAccBlockWeightedMarketCap: 0,
                feeExponent: +pair.feeExponent,
              }) as BorrowingFee.Pair,
          ),
          groups: (res.pairInfos.borrowingFees.groups as any[]).map(
            (group) => ({
              oiLong: parseFloat(group.oiLong) / 1e10,
              oiShort: parseFloat(group.oiShort) / 1e10,
              feePerBlock: parseFloat(group.feePerBlock) / 1e10,
              accFeeLong: parseFloat(group.accFeeLong) / 1e19,
              accFeeShort: parseFloat(group.accFeeShort) / 1e10,
              accLastUpdatedBlock: +group.accLastUpdatedBlock,
              maxOi: +group.maxOi,
              lastAccBlockWeightedMarketCap: 0,
              feeExponent: +group.feeExponent,
            }),
          ),
        },
      }
    : old.pairInfos;
  const openInterests = res.openInterests
    ? (res.openInterests as any[]).map((openInterest) => ({
        long:
          parseFloat(openInterest.long) /
          parseFloat(res.collateralConfig.precision),
        short:
          parseFloat(openInterest.short) /
          parseFloat(res.collateralConfig.precision),
        max:
          parseFloat(openInterest.max) /
          parseFloat(res.collateralConfig.precision),
      }))
    : old.openInterests;

  const maxNegativePnlOnOpenP = res.maxNegativePnlOnOpenP
    ? +res.maxNegativePnlOnOpenP
    : old.maxNegativePnlOnOpenP;

  const blockConfirmations = res.blockConfirmations
    ? +res.blockConfirmations
    : old.blockConfirmations;
  const canExecuteTimeout = res.canExecuteTimeout
    ? +res.canExecuteTimeout
    : old.canExecuteTimeout;
  const oiWindowsSettings = res.oiWindowsSettings
    ? {
        startTs: +res.oiWindows.startTs,
        windowsDuration: +res.oiWindows.windowsDuration,
        windowsCount: +res.oiWindows.windowsCount,
      }
    : old.oiWindowsSettings;

  const oiWindows = res.oiWindows
    ? (res.oiWindows as any[]).map((oiWindow) =>
        Object.fromEntries(
          Object.entries(oiWindow).map(([key, value]) => [
            key,
            {
              oiLongUsd: parseFloat((value as any).oiLongUsd) / 1e18,
              oiShortUsd: parseFloat((value as any).oiShortUsd) / 1e18,
            },
          ]),
        ),
      )
    : old.oiWindows;
  const currentBlock = res.currentBlock ? +res.currentBlock : old.currentBlock;
  const currentL1Block = res.currentL1Block
    ? +res.currentL1Block || null
    : old.currentL1Block;
  const isForexOpen = res.isForexOpen
    ? Boolean(res.isForexOpen)
    : old.isForexOpen;
  const isStocksOpen = res.isStocksOpen
    ? Boolean(res.isStocksOpen)
    : old.isStocksOpen;
  const isIndicesOpen = res.isIndicesOpen
    ? Boolean(res.isIndicesOpen)
    : old.isIndicesOpen;
  const isCommoditiesOpen = res.isCommoditiesOpen
    ? Boolean(res.isCommoditiesOpen)
    : old.isCommoditiesOpen;
  const maxTradesPerPair = res.maxTradesPerPair
    ? +res.maxTradesPerPair
    : old.maxTradesPerPair;
  const nftSuccessTimelock = res.nftSuccessTimelock
    ? +res.nftSuccessTimelock
    : old.nftSuccessTimelock;
  const marketOrdersTimeout = res.marketOrdersTimeout
    ? +res.marketOrdersTimeout
    : old.marketOrdersTimeout;
  const sssTokenBalance = res.sssTokenBalance
    ? BigInt(res.sssTokenBalance)
    : old.sssTokenBalance;
  const sssLegacyTokenBalance = res.sssLegacyTokenBalance
    ? BigInt(res.sssLegacyTokenBalance)
    : old.sssLegacyTokenBalance;
  const sssRewardTokens = res.sssRewardTokens
    ? (res.sssRewardTokens as Address[])
    : old.sssRewardTokens;
  const currentBalanceBaseAsset = res.currentBalanceBaseAsset
    ? BigInt(res.currentBalanceBaseAsset)
    : old.currentBalanceBaseAsset;
  const maxBalanceBaseAsset = res.maxBalanceBaseAsset
    ? BigInt(res.maxBalanceBaseAsset)
    : old.maxBalanceBaseAsset;
  const vaultMarketCap = res.vaultMarketCap
    ? BigInt(res.vaultMarketCap)
    : old.vaultMarketCap;
  const vaultFeeP = res.vaultFeeP ? BigInt(res.vaultFeeP) : old.vaultFeeP;
  const lpFeeP = res.lpFeeP ? BigInt(res.lpFeeP) : old.lpFeeP;
  const sssFeeP = res.sssFeeP ? BigInt(res.sssFeeP) : old.sssFeeP;
  const allTrades = res.allTrades
    ? (res.allTrades as any[]).map((data): TradeContainer | LimitOrder => {
        if (data.trade) {
          return {
            trade: {
              trader: data.trade.trader,
              pairIndex: +data.trade.pairIndex,
              index: +data.trade.index,
              initialPosToken: parseFloat(data.trade.initialPosToken) / 1e18,
              openPrice: parseFloat(data.trade.openPrice) / 1e10,
              buy: Boolean(data.trade.buy),
              leverage: +data.trade.leverage,
              sl: parseFloat(data.trade.sl) / 1e10,
              tp: parseFloat(data.trade.tp) / 1e10,
            },
            tradeInfo: {
              openInterestBaseAsset:
                parseFloat(data.tradeInfo.openInterestBaseAsset) /
                collateralConfig.precision,
              tokenPriceBaseAsset:
                parseFloat(data.tradeInfo.tokenPriceBaseAsset) / 1e10,
              slLastUpdated: +data.tradeInfo.slLastUpdated,
              tpLastUpdated: +data.tradeInfo.tpLastUpdated,
            },
            initialAccFees: {
              borrowing: {
                accPairFee:
                  parseFloat(data.initialAccFees.borrowing.accPairFee) / 1e10,
                accGroupFee:
                  parseFloat(data.initialAccFees.borrowing.accGroupFee) / 1e10,
                block: +data.initialAccFees.borrowing.block,
              },
              liquidationPrice:
                parseFloat(data.initialAccFees.liquidationPrice) / 1e10,
            },
            tradeData: {
              maxSlippageP: parseFloat(data.tradeData.maxSlippageP) / 1e10,
              lastOiUpdateTs: +data.tradeData.lastOiUpdateTs,
              collateralPriceUsd:
                parseFloat(data.tradeData.collateralPriceUsd) / 1e10,
            },
            receivedAt: data.tradeData.receivedAt,
          };
        } else {
          return {
            block: +data.block,
            buy: Boolean(data.buy),
            index: +data.index,
            leverage: +data.leverage,
            maxPrice: parseFloat(data.maxPrice) / 1e10,
            minPrice: parseFloat(data.minPrice) / 1e10,
            pairIndex: +data.pairIndex,
            positionSize:
              parseFloat(data.positionSize) / collateralConfig.precision,
            sl: parseFloat(data.sl) / 1e10,
            tp: parseFloat(data.tp) / 1e10,
            spreadReductionP: +data.spreadReductionP,
            trader: data.trader,
            type: +data.type,
            maxSlippageP: parseFloat(data.maxSlippageP) / 1e10,
          };
        }
      })
    : old.allTrades;

  return {
    ...old,
    lastRefreshed,
    refreshId,
    paused,
    maxGainP,
    collateralConfig,
    maxPosBaseAsset,
    prices,
    pairs,
    groups,
    fees,
    pairInfos,
    openInterests,
    maxNegativePnlOnOpenP,
    blockConfirmations,
    canExecuteTimeout,
    oiWindowsSettings,
    oiWindows,
    currentBlock,
    currentL1Block,
    isForexOpen,
    isStocksOpen,
    isIndicesOpen,
    isCommoditiesOpen,
    maxTradesPerPair,
    nftSuccessTimelock,
    marketOrdersTimeout,
    sssTokenBalance,
    sssLegacyTokenBalance,
    sssRewardTokens,
    currentBalanceBaseAsset,
    maxBalanceBaseAsset,
    vaultMarketCap,
    vaultFeeP,
    lpFeeP,
    sssFeeP,
    allTrades,
  };
}

export function convertResToTradingVariable(
  res: any,
  collateralType: CollateralTypes,
): TradingVariable {
  const lastRefreshed = new Date(res.lastRefreshed);
  const refreshId = +res.refreshId;
  const paused = Boolean(res.paused);
  const maxGainP = +res.maxGainP;
  const collateralConfig = {
    precision: +res.collateralConfig.precision,
    precisionDelta: +res.collateralConfig.precisionDelta,
    decimals: +res.collateralConfig.decimals,
  };
  const maxPosBaseAsset =
    parseFloat(res.maxPosBaseAsset) / collateralConfig.precision;
  const prices = {
    tizzPriceCollateral: parseFloat(res.prices.tizzPriceCollateral),
    tizzPriceUsd: parseFloat(res.prices.tizzPriceUsd),
    collateralPriceUsd:
      parseFloat(res.prices.collateralPriceUsd) / collateralConfig.precision,
  };
  const pairs = (res.pairs as any[]).map((pair, index) => ({
    name: `${pair.from}/${pair.to}`,
    description: getPairDescription(index),
    from: pair.from,
    to: pair.to,
    spreadP: +pair.spreadP / 1e10,
    groupIndex: +pair.groupIndex,
    feeIndex: +pair.feeIndex,
    pairIndex: index,
    pairId: +pair.pairId,
  }));
  const groups = (res.groups as any[]).map((group) => ({
    maxLeverage: +group.maxLeverage,
    minLeverage: +group.minLeverage,
    name: group.name,
  }));
  const fees = (res.fees as any[]).map((fee) => ({
    closeFeeP: parseFloat(fee.closeFeeP) / 1e12,
    minLevPosUsd: parseFloat(fee.minLevPosUsd) / 1e18,
    nftLimitOrderFeeP: !Number.isNaN(parseFloat(fee.nftLimitOrderFeeP))
      ? parseFloat(fee.nftLimitOrderFeeP) / 1e12
      : 0,
    openFeeP: parseFloat(fee.openFeeP) / 1e12,
    oracleFeeP: BigInt(fee.oracleFeeP),
  }));
  const pairInfos = {
    maxLeverages: res.pairInfos.maxLeverages,
    pairDepths: (res.pairInfos.pairDepths as any[]).map((pairDepth) => ({
      onePercentDepthAboveUsd: +pairDepth.onePercentDepthAboveUsd,
      onePercentDepthBelowUsd: +pairDepth.onePercentDepthBelowUsd,
    })),
    borrowingFees: {
      pairs: (res.pairInfos.borrowingFees.pairs as any[]).map(
        (pair) =>
          ({
            groups: (pair.groups as any[]).map((group) => ({
              groupIndex: +group.groupIndex,
              initialAccFeeLong: parseFloat(group.initialAccFeeLong) / 1e10,
              initialAccFeeShort: parseFloat(group.initialAccFeeShort) / 1e10,
              prevGroupAccFeeLong: parseFloat(group.prevGroupAccFeeLong) / 1e10,
              prevGroupAccFeeShort:
                parseFloat(group.prevGroupAccFeeShort) / 1e10,
              pairAccFeeLong: parseFloat(group.pairAccFeeLong) / 1e10,
              pairAccFeeShort: parseFloat(group.pairAccFeeShort) / 1e10,
              block: +group.block,
            })),
            feePerBlock: parseFloat(pair.feePerBlock) / 1e10,
            accFeeLong: parseFloat(pair.accFeeLong) / 1e10,
            accFeeShort: parseFloat(pair.accFeeShort) / 1e10,
            accLastUpdatedBlock: +pair.accLastUpdatedBlock,
            maxOi: +pair.maxOi,
            lastAccBlockWeightedMarketCap: 0,
            feeExponent: +pair.feeExponent,
          }) as BorrowingFee.Pair,
      ),
      groups: (res.pairInfos.borrowingFees.groups as any[]).map((group) => ({
        oiLong: parseFloat(group.oiLong) / 1e10,
        oiShort: parseFloat(group.oiShort) / 1e10,
        feePerBlock: parseFloat(group.feePerBlock) / 1e10,
        accFeeLong: parseFloat(group.accFeeLong) / 1e19,
        accFeeShort: parseFloat(group.accFeeShort) / 1e10,
        accLastUpdatedBlock: +group.accLastUpdatedBlock,
        maxOi: parseFloat(group.maxOi) / 1e10,
        lastAccBlockWeightedMarketCap: 0,
        feeExponent: +group.feeExponent,
      })),
    },
  };
  const openInterests = (res.openInterests as any[]).map((openInterest) => ({
    long:
      parseFloat(openInterest.long) /
      parseFloat(res.collateralConfig.precision),
    short:
      parseFloat(openInterest.short) /
      parseFloat(res.collateralConfig.precision),
    max:
      parseFloat(openInterest.max) / parseFloat(res.collateralConfig.precision),
  }));
  const maxNegativePnlOnOpenP = +res.maxNegativePnlOnOpenP;
  const blockConfirmations = +res.blockConfirmations;
  const canExecuteTimeout = +res.canExecuteTimeout;
  const oiWindowsSettings = {
    startTs: +res.oiWindowsSettings.startTs,
    windowsDuration: +res.oiWindowsSettings.windowsDuration,
    windowsCount: +res.oiWindowsSettings.windowsCount,
  };
  const oiWindows = (res.oiWindows as any[]).map((oiWindow) =>
    Object.fromEntries(
      Object.entries(oiWindow).map(([key, value]) => [
        key,
        {
          oiLongUsd: +(value as any).oiLongUsd,
          oiShortUsd: +(value as any).oiShortUsd,
        },
      ]),
    ),
  );
  const currentBlock = +res.currentBlock;
  const currentL1Block = +res.currentL1Block || null;
  const isForexOpen = Boolean(res.isForexOpen);
  const isStocksOpen = Boolean(res.isStocksOpen);
  const isIndicesOpen = Boolean(res.isIndicesOpen);
  const isCommoditiesOpen = Boolean(res.isCommoditiesOpen);
  const maxTradesPerPair = +res.maxTradesPerPair;
  const nftSuccessTimelock = +res.nftSuccessTimelock;
  const marketOrdersTimeout = +res.marketOrdersTimeout;
  const sssTokenBalance = BigInt(res.sssTokenBalance || 0);
  const sssLegacyTokenBalance = BigInt(res.sssLegacyTokenBalance || 0);
  const sssRewardTokens = res.sssRewardTokens as Address[];
  const currentBalanceBaseAsset = BigInt(res.currentBalanceBaseAsset || 0);
  const vaultMarketCap = BigInt(res.vaultMarketCap || 0);
  const vaultFeeP = BigInt(res.vaultFeeP || 0);
  const lpFeeP = BigInt(res.lpFeeP || 0);
  const sssFeeP = BigInt(res.sssFeeP || 0);
  const maxBalanceBaseAsset = BigInt(res.maxBalanceBaseAsset || 0);
  const nextFundingFeeApplyTime = +res.next_funding_fee_apply_time || 0;

  const allTrades = (res.allTrades as any[])
    .filter((trade) => trade.collateral === collateralType)
    .map((data): TradeContainer | LimitOrder => {
      if (data.trade) {
        return {
          trade: {
            trader: data.trade.trader,
            pairIndex: +data.trade.pairIndex,
            index: +data.trade.index,
            initialPosToken:
              parseFloat(data.trade.initialPosToken) /
              collateralConfig.precision,
            openPrice: parseFloat(data.trade.openPrice) / 1e10,
            buy: Boolean(data.trade.buy),
            leverage: +data.trade.leverage,
            sl: parseFloat(data.trade.sl) / 1e10,
            tp: parseFloat(data.trade.tp) / 1e10,
          },
          tradeInfo: {
            openInterestBaseAsset:
              parseFloat(data.tradeInfo.openInterestBaseAsset) /
              collateralConfig.precision,
            tokenPriceBaseAsset:
              parseFloat(data.tradeInfo.tokenPriceBaseAsset) / 1e10,
            slLastUpdated: +data.tradeInfo.slLastUpdated,
            tpLastUpdated: +data.tradeInfo.tpLastUpdated,
          },
          initialAccFees: {
            borrowing: {
              accPairFee:
                parseFloat(data.tradeInitialAccFees.borrowing.accPairFee) /
                1e10,
              accGroupFee:
                parseFloat(data.tradeInitialAccFees.borrowing.accGroupFee) /
                1e10,
              block: +data.tradeInitialAccFees.borrowing.block,
            },
            liquidationPrice:
              parseFloat(data.tradeInitialAccFees.liquidationPrice) / 1e10,
          },
          tradeData: {
            maxSlippageP: parseFloat(data.tradeData.maxSlippageP) / 1e10,
            lastOiUpdateTs: +data.tradeData.lastOiUpdateTs,
            collateralPriceUsd:
              parseFloat(data.tradeData.collateralPriceUsd) / 1e10,
          },
        };
      } else {
        return {
          block: +data.block,
          buy: Boolean(data.buy),
          index: +data.index,
          leverage: +data.leverage,
          maxPrice: parseFloat(data.maxPrice) / 1e10,
          minPrice: parseFloat(data.minPrice) / 1e10,
          pairIndex: +data.pairIndex,
          positionSize:
            parseFloat(data.positionSize) / collateralConfig.precision,
          sl: parseFloat(data.sl) / 1e10,
          tp: parseFloat(data.tp) / 1e10,
          spreadReductionP: +data.spreadReductionP,
          trader: data.trader,
          type: +data.type,
          maxSlippageP: parseFloat(data.maxSlippageP) / 1e10,
        };
      }
    });

  return {
    lastRefreshed,
    refreshId,
    paused,
    maxGainP,
    collateralConfig,
    prices,
    pairs,
    groups,
    fees,
    pairInfos,
    openInterests,
    maxNegativePnlOnOpenP,
    blockConfirmations,
    canExecuteTimeout,
    oiWindowsSettings,
    oiWindows,
    currentBlock,
    currentL1Block,
    isForexOpen,
    isStocksOpen,
    isIndicesOpen,
    isCommoditiesOpen,
    maxTradesPerPair,
    nftSuccessTimelock,
    marketOrdersTimeout,
    sssTokenBalance,
    sssLegacyTokenBalance,
    sssRewardTokens,
    currentBalanceBaseAsset,
    maxPosBaseAsset,
    maxBalanceBaseAsset,
    vaultMarketCap,
    vaultFeeP,
    lpFeeP,
    sssFeeP,
    allTrades,
    nextFundingFeeApplyTime,
  };
}

export async function getTradingVariables(
  chainId: number,
  collateralType: CollateralTypes,
): Promise<TradingVariable | undefined> {
  try {
    const res = await fetch(
      getEndpoints("tradingVariables", chainId, collateralType),
    ).then((res) => res.json());

    if (!res) {
      return undefined;
    }

    const tv = convertResToTradingVariable(res, collateralType);

    console.log(collateralType, tv);

    return tv;
  } catch (error) {
    console.log(error);
    throw new Error("Failed at fetching trading variables");
  }
}
