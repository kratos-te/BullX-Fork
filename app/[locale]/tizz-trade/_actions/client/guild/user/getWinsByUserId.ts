"use client";

import { customFetch } from "../fetchConfig";

export type TradingActivity = {
  volume: number;
  pnl: number;
  wins: number;
  tradeCount: number;
  round: {
    start_time: string;
    end_time: string;
  };
};

export type UserWins = {
  userId: number;
  totalWins: number;
  details: TradingActivity[];
};

export async function getWinsByUserId(userId: number): Promise<UserWins> {
  try {
    const res = await customFetch(`/user/${userId}/wins`, {
      method: "get",
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as UserWins;
  } catch (err) {
    return Promise.reject(new Error("Failed at getting wins by user id"));
  }
}
