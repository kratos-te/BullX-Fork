"use client";

import { customFetch } from "../fetchConfig";

export async function getListActiveRoundParticipantsById(
  round_id: number,
): Promise<unknown> {
  try {
    const res = await customFetch(
      `/admin/listActiveRoundParticipants/${round_id}`,
      {
        method: "get",
        body: JSON.stringify({}),
      },
    ).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as unknown;
  } catch (err) {
    return Promise.reject(
      new Error("Failed at listing active round participants by id"),
    );
  }
}
