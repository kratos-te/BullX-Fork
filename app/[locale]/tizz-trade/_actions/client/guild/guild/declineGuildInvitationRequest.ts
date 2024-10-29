"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { IGuildMembershipAction } from "@/types/index";

export type AcceptInvitationRequestDto = {
  action: IGuildMembershipAction;
};

export async function declineGuildInvitationRequest(
  variables: AcceptInvitationRequestDto,
): Promise<boolean> {
  try {
    const { action_id } = variables.action;

    const res = await customFetch("/guild/declineInvitationRequest", {
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
      new Error("Failed at declining a guild invitation request"),
    );
  }
}
