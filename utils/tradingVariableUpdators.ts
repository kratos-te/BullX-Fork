import {
  TradingVariable,
  UnregisterLimitPayload,
  AccBorrowingFeesPairUpdatedPayload,
  AccBorrowingFeesGroupUpdatedPayload,
  OpenInterestGroupUpdatedPayload,
  OiWindowUpdatedPayload,
  TradePayload,
  LimitOrderPayload,
} from "../types";
import { isLimitOrder, isTradeContainer } from "./index";

export function currentBlockUpdator(
  old: TradingVariable | undefined,
  currentBlock: number,
): TradingVariable | undefined {
  if (!old) {
    return undefined;
  }

  return {
    ...old,
    currentBlock,
  };
}

export function unregisterLimitOrderUpdator(
  oldData: TradingVariable | undefined,
  payload: UnregisterLimitPayload,
): TradingVariable | undefined {
  if (!oldData) {
    return undefined;
  }

  return {
    ...oldData,
    allTrades: oldData.allTrades.filter((trade) => {
      if (
        isLimitOrder(trade) &&
        trade.trader === payload.trader &&
        trade.pairIndex === +payload.pairIndex &&
        trade.index === +payload.index
      ) {
        return false;
      }

      return true;
    }),
  };
}

export function accBorrowingFeesPairUpdator(
  oldData: TradingVariable | undefined,
  payload: AccBorrowingFeesPairUpdatedPayload,
): TradingVariable | undefined {
  if (!oldData) {
    return undefined;
  }

  return {
    ...oldData,
    pairInfos: {
      ...oldData.pairInfos,
      borrowingFees: {
        ...oldData.pairInfos.borrowingFees,
        pairs: oldData.pairInfos.borrowingFees.pairs.map((pair, index) => {
          if (index === +payload.pairIndex) {
            return {
              ...pair,
              accFeeLong:
                parseFloat(payload.pairBorrowingFees.accFeeLong) / 1e10,
              accFeeShort:
                parseFloat(payload.pairBorrowingFees.accFeeShort) / 1e10,
              accLastUpdatedBlock:
                +payload.pairBorrowingFees.accLastUpdateBlock,
            };
          }

          return pair;
        }),
      },
    },
  };
}

export function accBorrowingFeesGroupUpdator(
  oldData: TradingVariable | undefined,
  payload: AccBorrowingFeesGroupUpdatedPayload,
): TradingVariable | undefined {
  if (!oldData) {
    return undefined;
  }

  return {
    ...oldData,
    pairInfos: {
      ...oldData.pairInfos,
      borrowingFees: {
        ...oldData.pairInfos.borrowingFees,
        groups: oldData.pairInfos.borrowingFees.groups.map((group, index) => {
          if (index === +payload.groupIndex) {
            return {
              ...group,
              accFeeLong:
                parseFloat(payload.groupBorrowingFees.accFeeLong) / 1e10,
              accFeeShort:
                parseFloat(payload.groupBorrowingFees.accFeeShort) / 1e10,
              accLastUpdatedBlock:
                +payload.groupBorrowingFees.accLastUpdateBlock,
            };
          }

          return group;
        }),
      },
    },
  };
}

export function openInterestGroupUpdator(
  oldData: TradingVariable | undefined,
  payload: OpenInterestGroupUpdatedPayload,
): TradingVariable | undefined {
  if (!oldData) {
    return undefined;
  }

  return {
    ...oldData,
    pairInfos: {
      ...oldData.pairInfos,
      borrowingFees: {
        ...oldData.pairInfos.borrowingFees,
        groups: oldData.pairInfos.borrowingFees.groups.map((group, index) => {
          if (index === +payload.groupIndex) {
            return {
              ...group,
              oiLong: parseFloat(payload.groupBorrowingFees.oiLong) / 1e10,
              oiShort: parseFloat(payload.groupBorrowingFees.oiShort) / 1e10,
            };
          }

          return group;
        }),
      },
    },
  };
}

export function oiWindowUpdator(
  oldData: TradingVariable | undefined,
  payload: OiWindowUpdatedPayload,
): TradingVariable | undefined {
  if (!oldData) {
    return undefined;
  }

  return {
    ...oldData,
    oiWindows: oldData.oiWindows.map((oiWindow, index) => {
      if (index === +payload.pairIndex) {
        return {
          ...oiWindow,
          [payload.windowId]: {
            oiLongUsd: parseFloat(`${payload.newOi.oiLongUsd}`) / 1e18,
            oiShortUsd: parseFloat(`${payload.newOi.oiShortUsd}`) / 1e18,
          },
        };
      }

      return oiWindow;
    }),
  };
}

export function registerTradeUpdator(
  oldData: TradingVariable | undefined,
  payload: TradePayload,
): TradingVariable | undefined {
  if (!oldData) {
    return undefined;
  }

  return {
    ...oldData,
    allTrades: [
      {
        trade: {
          trader: payload.trade.trader,
          pairIndex: +payload.trade.pairIndex,
          index: +payload.trade.index,
          initialPosToken: parseFloat(payload.trade.initialPosToken) / 1e18,
          openPrice: parseFloat(payload.trade.openPrice) / 1e10,
          buy: Boolean(payload.trade.buy),
          leverage: +payload.trade.leverage,
          sl: parseFloat(payload.trade.sl) / 1e10,
          tp: parseFloat(payload.trade.tp) / 1e10,
        },
        tradeInfo: {
          openInterestBaseAsset:
            parseFloat(payload.tradeInfo.openInterestBaseAsset) /
            oldData.collateralConfig.precision,
          tokenPriceBaseAsset:
            parseFloat(payload.tradeInfo.tokenPriceBaseAsset) / 1e10,
          slLastUpdated: +payload.tradeInfo.slLastUpdated,
          tpLastUpdated: +payload.tradeInfo.tpLastUpdated,
        },
        initialAccFees: {
          borrowing: {
            accPairFee:
              parseFloat(payload.initialAccFees.borrowing.accPairFee) / 1e10,
            accGroupFee:
              parseFloat(payload.initialAccFees.borrowing.accGroupFee) / 1e10,
            block: +payload.initialAccFees.borrowing.block,
          },
          liquidationPrice: 0,
        },
        tradeData: {
          maxSlippageP: parseFloat(payload.tradeData.maxSlippageP) / 1e10,
          lastOiUpdateTs: +payload.tradeData.lastOiUpdateTs,
          collateralPriceUsd:
            parseFloat(payload.tradeData.collateralPriceUsd) / 1e10,
        },
      },
      ...oldData.allTrades,
    ],
  };
}

export function tradeContainerUpdator(
  oldData: TradingVariable | undefined,
  payload: TradePayload,
): TradingVariable | undefined {
  if (!oldData) {
    return undefined;
  }

  if (payload.tradeInfo.beingMarketClosed) {
    return {
      ...oldData,
      allTrades: [
        ...oldData.allTrades.filter((trade) => {
          if (
            isTradeContainer(trade) &&
            trade.trade.trader === payload.trade.trader &&
            trade.trade.pairIndex === +payload.trade.pairIndex &&
            trade.trade.index === +payload.trade.index
          ) {
            return false;
          }

          return true;
        }),
      ],
    };
  }

  return {
    ...oldData,
    allTrades: [
      ...oldData.allTrades.map((trade) => {
        if (
          isTradeContainer(trade) &&
          trade.trade.trader === payload.trade.trader &&
          trade.trade.pairIndex === +payload.trade.pairIndex &&
          trade.trade.index === +payload.trade.index
        ) {
          return {
            trade: {
              trader: payload.trade.trader,
              pairIndex: +payload.trade.pairIndex,
              index: +payload.trade.index,
              initialPosToken: parseFloat(payload.trade.initialPosToken) / 1e18,
              openPrice: parseFloat(payload.trade.openPrice) / 1e10,
              buy: Boolean(payload.trade.buy),
              leverage: +payload.trade.leverage,
              sl: parseFloat(payload.trade.sl) / 1e10,
              tp: parseFloat(payload.trade.tp) / 1e10,
            },
            tradeInfo: {
              openInterestBaseAsset:
                parseFloat(payload.tradeInfo.openInterestBaseAsset) /
                oldData.collateralConfig.precision,
              tokenPriceBaseAsset:
                parseFloat(payload.tradeInfo.tokenPriceBaseAsset) / 1e10,
              slLastUpdated: +payload.tradeInfo.slLastUpdated,
              tpLastUpdated: +payload.tradeInfo.tpLastUpdated,
            },
            initialAccFees: {
              borrowing: {
                accPairFee:
                  parseFloat(payload.initialAccFees.borrowing.accPairFee) /
                  1e10,
                accGroupFee:
                  parseFloat(payload.initialAccFees.borrowing.accGroupFee) /
                  1e10,
                block: +payload.initialAccFees.borrowing.block,
              },
              liquidationPrice: 0,
            },
            tradeData: {
              maxSlippageP: parseFloat(payload.tradeData.maxSlippageP) / 1e10,
              lastOiUpdateTs: +payload.tradeData.lastOiUpdateTs,
              collateralPriceUsd:
                parseFloat(payload.tradeData.collateralPriceUsd) / 1e10,
            },
          };
        }

        return trade;
      }),
    ],
  };
}

export function limitOrderUpdator(
  oldData: TradingVariable | undefined,
  payload: LimitOrderPayload,
): TradingVariable | undefined {
  if (!oldData) {
    return undefined;
  }

  return {
    ...oldData,
    allTrades: [
      ...oldData.allTrades.map((trade) => {
        if (
          isLimitOrder(trade) &&
          trade.trader === payload.trader &&
          trade.pairIndex === +payload.pairIndex &&
          trade.index === +payload.index
        ) {
          return {
            block: +payload.block,
            buy: Boolean(payload.buy),
            index: +payload.index,
            leverage: +payload.leverage,
            maxPrice: parseFloat(payload.maxPrice) / 1e10,
            minPrice: parseFloat(payload.minPrice) / 1e10,
            pairIndex: +payload.pairIndex,
            positionSize:
              parseFloat(payload.positionSize) /
              oldData.collateralConfig.precision,
            sl: parseFloat(payload.sl) / 1e10,
            tp: parseFloat(payload.tp) / 1e10,
            spreadReductionP: +payload.spreadReductionP,
            trader: payload.trader,
            type: +payload.type,
            maxSlippageP: parseFloat(payload.maxSlippageP) / 1e10,
          };
        }

        return trade;
      }),
    ],
  };
}
