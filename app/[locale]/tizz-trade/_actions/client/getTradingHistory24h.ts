"use client";

import { getEndpoints } from "./config";
import { CollateralTypes, collateralPrecisions } from "@/utils/tizz";
import { TradeHistoryRecord } from "@/types/index";

export async function getTradingHistory24h(
  chainId: number,
  collateralType: CollateralTypes,
): Promise<TradeHistoryRecord[]> {
  try {
    const res = await fetch(
      getEndpoints("tradingHistory24", chainId, collateralType),
    ).then((res) => res.json());

    if (!res) {
      return [];
    }

    return res.map(
      (trade: any) =>
        ({
          action: trade.action,
          address: trade.address,
          buy: +trade.long,
          collateral: trade.collateral,
          collateralPriceUsd: parseFloat(trade.collateralPriceUsd) / 1e10,
          date: trade.date,
          leverage: +trade.leverage,
          pair: trade.pair,
          pnl_net:
            parseFloat(trade.pnl_net) /
            collateralPrecisions[trade.collateral as CollateralTypes],
          openPrice: parseFloat(trade.openPrice) / 1e10,
          closePrice:
            trade.closePrice !== undefined
              ? parseFloat(trade.closePrice) / 1e10
              : undefined,
          size:
            parseFloat(trade.size) /
            collateralPrecisions[trade.collateral as CollateralTypes],
          tx: trade.tx,
        }) as TradeHistoryRecord,
    );
  } catch (error) {
    throw new Error("Failed at fetching trading history24h");
  }
}
