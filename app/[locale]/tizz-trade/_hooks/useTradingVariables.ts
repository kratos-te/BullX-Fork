"use client";

import { useQuery } from "@tanstack/react-query";
import { CollateralTypes } from "@/utils/tizz";

import { getTradingVariables } from "@/tizz-trade-actions/client/getTradingVariables";

export function useTradingVariables(
  chainId: number,
  collateralType: CollateralTypes,
) {
  const { data } = useQuery({
    queryKey: ["trading-variables", { chainId, collateralType }],
    queryFn: async () => {
      const tv = await getTradingVariables(chainId, collateralType);

      if (tv === undefined) {
        return null;
      }

      return tv;
    },
  });

  return data;
}
