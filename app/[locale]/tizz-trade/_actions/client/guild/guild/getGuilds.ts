"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { IGuildWithAggregation } from "@/types/index";

export async function getGuilds(): Promise<IGuildWithAggregation[]> {
  try {
    const res = await customFetch("/guild/guilds?pageSize=100", {
      method: "get",
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return (res as IGuildWithAggregation[])
      .map((item) => ({
        ...item,
        totalVolume: +item.totalVolume,
        totalPnL: +item.totalPnL,
        totalWins: +item.totalWins,
        totalTrades: +item.totalTrades,
        totalOverAllVolume: +item.totalOverAllVolume,
        totalOverAllPnL: +item.totalOverAllPnL,
        totalOverAllWins: +item.totalOverAllWins,
      }))
      .sort((a, b) => a.rank - b.rank);
  } catch (err) {
    return Promise.reject(new Error("Failed at getting all guilds"));
  }
}
