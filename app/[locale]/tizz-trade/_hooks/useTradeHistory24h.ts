"use client";

import { useQuery } from "@tanstack/react-query";
import { CollateralTypes } from "@/utils/tizz";

import { getTradingHistory24h } from "@/tizz-trade-actions/client/getTradingHistory24h";

export function useTradeHistory24h(
  chainId: number,
  collateralType: CollateralTypes,
) {
  const { data } = useQuery({
    queryKey: ["trade-history-24h", { chainId, collateralType }],
    queryFn: async () => {
      return getTradingHistory24h(chainId, collateralType);
    },
  });

  return data;
}
