"use client";

import { IGuildUser } from "@/types/index";

import { customFetch } from "../fetchConfig";

export async function suspendUser(variables: {
  userId: number;
}): Promise<{ message: string }> {
  try {
    const res = await customFetch("/admin/suspend", {
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
    return Promise.reject(new Error("Failed at removing user"));
  }
}
