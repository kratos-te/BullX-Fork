"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { IGuild } from "@/types/index";

export type AcceptOwnershipTransferDto = {
  guild_id: number;
};

export async function acceptOwnershipTransfer(
  variables: AcceptOwnershipTransferDto,
): Promise<IGuild> {
  try {
    const res = await customFetch("/guild/acceptOwnershipTransfer", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return res as IGuild;
  } catch (err) {
    return Promise.reject(new Error("Failed at accepting ownership transfer"));
  }
}
