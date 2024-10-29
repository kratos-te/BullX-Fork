"use client";

import { useQuery } from "@tanstack/react-query";

import { Address } from "viem";

import { getPersonalTradingHistoryTable } from "@/tizz-trade-actions/client/getPersonalTradingHistoryTable";

export function useUserTradingHistories(chainId: number, address?: Address) {
  const { data } = useQuery({
    queryKey: ["personal-trading-history-table", { chainId, address }],
    queryFn: async () => {
      if (address) {
        return getPersonalTradingHistoryTable(chainId, address);
      }

      return [];
    },
  });

  return data;
}
