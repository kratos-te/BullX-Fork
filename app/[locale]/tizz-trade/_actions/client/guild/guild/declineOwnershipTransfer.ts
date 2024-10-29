"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";

export type AcceptOwnershipTransferDto = {
  guild_id: number;
};

export async function declineOwnershipTransfer(
  variables: AcceptOwnershipTransferDto,
): Promise<boolean> {
  try {
    const res = await customFetch("/guild/declineOwnershipTransfer", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return true;
  } catch (err) {
    return Promise.reject(new Error("Failed at declining ownership transfer"));
  }
}
