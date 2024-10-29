"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";

export type CreateOwnershipTransferDto = {
  guild_id: number;
  user_id: number;
};

export type GuildOwnershipTransfer = {
  transfer_id: number;
  guild_id: number;
  old_owner_id: number;
  new_owner_id: number;
  status: string;
  requested_at: Date;
  responded_at: Date;
};

export async function createOwnershipTransfer(
  variables: CreateOwnershipTransferDto,
): Promise<GuildOwnershipTransfer> {
  try {
    const res = await customFetch("/guild/createOwnershipTransfer", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return res as GuildOwnershipTransfer;
  } catch (err) {
    return Promise.reject(new Error("Failed at creating ownership transfer"));
  }
}
