"use client";

import { customFetch } from "../fetchConfig";

export type TradingActivity = {
  pnl: number;
  round: {
    start_time: string;
    end_time: string;
  };
};

export type UserPnl = {
  userId: number;
  totalPnL: number;
  details: TradingActivity[];
};

export async function getPnlByUserId(userId: number): Promise<UserPnl> {
  try {
    const res = await customFetch(`/user/${userId}/pnl`, {
      method: "get",
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as UserPnl;
  } catch (err) {
    return Promise.reject(new Error("Failed at getting pnl"));
  }
}
