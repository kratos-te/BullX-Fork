"use client";

import { getEndpoints } from "./config";
import { CollateralTypes, collateralPrecisions } from "@/utils/tizz";

export async function getVolume(
  chainId: number,
  collateralType: CollateralTypes,
) {
  try {
    const res = await fetch(
      getEndpoints("getVolume", chainId, collateralType),
    ).then((res) => res.json());

    if (
      !res ||
      !res?.daily ||
      !res?.daily?.collateral ||
      res?.daily?.volume === undefined ||
      res?.daily?.count === undefined ||
      !res?.all ||
      !res?.all?.collateral ||
      res?.all?.volume === undefined ||
      res?.all?.count === undefined
    ) {
      throw new Error();
    }

    return {
      daily: {
        collateral: collateralType,
        volume:
          parseFloat(res.daily.volume) / collateralPrecisions[collateralType],
        count: +res.daily.count,
      },
      all: {
        collateral: collateralType,
        volume:
          parseFloat(res.all.volume) / collateralPrecisions[collateralType],
        count: +res.all.count,
      },
    };
  } catch (err) {
    return Promise.reject(new Error("Failed at fetching getVolume"));
  }
}
