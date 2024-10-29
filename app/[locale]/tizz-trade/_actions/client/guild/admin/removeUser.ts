"use client";

import { IGuildUser } from "@/types/index";

import { customFetch } from "../fetchConfig";

export async function removeUser(variables: {
  userId: number;
}): Promise<IGuildUser> {
  try {
    const res = await customFetch("/admin/remove", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as IGuildUser;
  } catch (err) {
    return Promise.reject(new Error("Failed at removing user"));
  }
}
