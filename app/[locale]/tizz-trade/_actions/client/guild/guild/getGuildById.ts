"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { IGuildWithAggregation } from "@/types/index";

export async function getGuildById(
  guildId: number,
): Promise<IGuildWithAggregation> {
  try {
    const res = await customFetch(`/guild/${guildId}`, {
      method: "get",
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return {
      ...res,
      totalVolume: +res.tradingVolume,
      totalPnL: +res.totalPnL,
      totalWins: +res.totalWins,
      totalTrades: +res.totalTrades,
      totalOverAllVolume: +res.tradingOverAllVolume,
      totalOverAllPnL: +res.totalOverAllPnL,
      totalOverAllWins: +res.totalOverAllWins,
    } as IGuildWithAggregation;
  } catch (err) {
    return Promise.reject(new Error("Failed at getting a guild by id"));
  }
}
