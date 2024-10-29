"use client";

import { useQuery } from "@tanstack/react-query";

import { Address } from "viem";

import { getPersonalTradingHistoryTable } from "@/tizz-trade-actions/client/getPersonalTradingHistoryTable";
import { TradeHistoryRecord } from "@/types/index";

export function useTradingHistories(chainId: number, addresses: Address[]) {
  const query = useQuery({
    queryKey: ["trading-history-table-by-addresses", { chainId, addresses }],
    queryFn: async () => {
      if (addresses.length === 0) {
        return [];
      }

      try {
        const resultPromises = addresses.map((address) =>
          getPersonalTradingHistoryTable(chainId, address),
        );

        return await Promise.all(resultPromises).then((tradeHistories) =>
          tradeHistories.reduce(
            (acc, item) => [...acc, ...item],
            [] as TradeHistoryRecord[],
          ),
        );
      } catch (err) {
        Promise.reject(new Error("Failed at getting all tradeHistories"));
      }
    },
  });

  return query;
}
