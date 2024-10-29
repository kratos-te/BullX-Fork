"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { IGuildMembershipAction } from "@/types/index";

export async function getInvitationRequests({
  userId,
}: {
  userId: number;
}): Promise<IGuildMembershipAction[]> {
  try {
    const res = await customFetch(`/guild/getInvitationRequests/${userId}`, {
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
    return Promise.reject(new Error("Failed at getting all invitations"));
  }
}
