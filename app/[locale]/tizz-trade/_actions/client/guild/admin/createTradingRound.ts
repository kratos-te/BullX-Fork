"use client";

import { customFetch } from "../fetchConfig";

export async function createTradingRound(variables: {
  start_time: string;
  end_time: string;
}): Promise<{ message: string }> {
  try {
    const res = await customFetch("/admin/createTradingRound", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as {
      message: string;
    };
  } catch (err) {
    return Promise.reject(new Error("Failed at creating trading round"));
  }
}
