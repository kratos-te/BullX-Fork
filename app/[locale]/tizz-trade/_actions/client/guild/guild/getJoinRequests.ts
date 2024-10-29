"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { IGuildMembershipAction } from "@/types/index";
import { customFetch } from "../fetchConfig";

export async function getJoinRequests({
  guildId,
}: {
  guildId: number;
}): Promise<IGuildMembershipAction[]> {
  try {
    const res = await customFetch(`/guild/getJoinRequests/${guildId}`, {
      method: "get",
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return res as IGuildMembershipAction[];
  } catch (err) {
    return Promise.reject(new Error("Failed at getting all joins"));
  }
}
