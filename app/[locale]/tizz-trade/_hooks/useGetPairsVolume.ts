"use client";

import { useQuery } from "@tanstack/react-query";
import { CollateralTypes } from "@/utils/tizz";

import { getPairsVolume } from "@/tizz-trade-actions/client/getPairsVolume";

export function useGetPairsVolume(
  chainId: number,
  collateralType: CollateralTypes,
) {
  const { data } = useQuery({
    queryKey: ["get-pairs-volume", { chainId, collateralType }],
    queryFn: async () => {
      const volume = await getPairsVolume(chainId, collateralType);

      if (volume === undefined) {
        return null;
      }

      return volume;
    },
  });

  return data;
}
