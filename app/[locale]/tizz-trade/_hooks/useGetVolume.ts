"use client";

import { useQuery } from "@tanstack/react-query";
import { CollateralTypes } from "@/utils/tizz";

import { getVolume } from "@/tizz-trade-actions/client/getVolume";

export function useGetVolume(chainId: number, collateralType: CollateralTypes) {
  const { data } = useQuery({
    queryKey: ["get-volume", { chainId, collateralType }],
    queryFn: async () => {
      const volume = await getVolume(chainId, collateralType);

      if (volume === undefined) {
        return null;
      }

      return volume;
    },
  });

  return data;
}
