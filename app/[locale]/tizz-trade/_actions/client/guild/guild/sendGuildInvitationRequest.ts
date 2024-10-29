"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { IGuildMembershipAction } from "@/types/index";

export type InvitationRequestDto = {
  guild_id: number;
  user_id: number;
};

export async function sendGuildInvitationRequest(
  variables: InvitationRequestDto,
): Promise<IGuildMembershipAction> {
  try {
    const res = await customFetch("/guild/sendInvitationRequest", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return res as IGuildMembershipAction;
  } catch (err) {
    return Promise.reject(new Error("Failed at creating a guild join request"));
  }
}
