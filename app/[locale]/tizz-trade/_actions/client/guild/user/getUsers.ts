"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { IGuildUserWithAggregation } from "@/types/index";

export async function getUsers(): Promise<IGuildUserWithAggregation[]> {
  try {
    const res = await customFetch("/user/users?pageSize=100", {
      method: "get",
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return (res as IGuildUserWithAggregation[])
      .map((item) => ({
        ...item,
        totalPnL: +item.totalPnL,
        totalVolume: +item.totalVolume,
        totalWins: +item.totalWins,
        totalOverallPnL: +item.totalOverallPnL,
        totalOverallVolume: +item.totalOverallVolume,
        totalOverAllWins: +item.totalOverAllWins,
      }))
      .sort((a, b) => {
        return a.rank - b.rank;
      });
  } catch (err) {
    console.log(err);
    return Promise.reject(new Error("Failed at getting users data"));
  }
}
