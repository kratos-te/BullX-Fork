"use client";

import { customFetch } from "../fetchConfig";
import { IGuildUser } from "@/types/index";

export type TradingActivity = {
  pnl: number;
  round: {
    start_time: string;
    end_time: string;
  };
};

export type UserVolume = {
  userId: number;
  totalVolume: number;
  details: TradingActivity[];
};

export async function getVolumeByUserId(userId: number): Promise<UserVolume> {
  try {
    const res = await customFetch(`/user/${userId}/volume`, {
      method: "get",
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as UserVolume;
  } catch (err) {
    return Promise.reject(new Error("Failed at getting volumn by user id"));
  }
}
