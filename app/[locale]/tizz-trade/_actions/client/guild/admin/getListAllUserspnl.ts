"use client";

import { customFetch } from "../fetchConfig";

export async function getListAllUserspnl(): Promise<unknown> {
  try {
    const res = await customFetch(`/admin/listAllUserspnl`, {
      method: "get",
      body: JSON.stringify({}),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as unknown;
  } catch (err) {
    return Promise.reject(new Error("Failed at list all userspnl"));
  }
}
