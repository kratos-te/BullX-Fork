"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { IGuildMembershipAction } from "@/types/index";

export type DeclineJoinGuildDto = {
  action: IGuildMembershipAction;
};

export async function declineGuildJoinRequest(
  variables: DeclineJoinGuildDto,
): Promise<boolean> {
  try {
    const { action_id } = variables.action;

    const res = await customFetch("/guild/declineJoinRequest", {
      method: "post",
      body: JSON.stringify({ action_id }),
    });

    if (res.status === 200) {
      return true;
    }

    const err = await res.json();

    if (isGuildApiError(err)) {
      return Promise.reject(convertResToGuildError(err));
    }

    return false;
  } catch (err) {
    return Promise.reject(
      new Error("Failed at rejecting a guild join request"),
    );
  }
}
