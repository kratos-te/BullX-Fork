"use client";

import { customFetch } from "../fetchConfig";

export async function completeGuildTask(): Promise<unknown> {
  try {
    const res = await customFetch("/events/completeGuildTask", {
      method: "post",
      body: JSON.stringify({}),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as unknown;
  } catch (err) {
    return Promise.reject(new Error("Failed at completing guild task"));
  }
}
