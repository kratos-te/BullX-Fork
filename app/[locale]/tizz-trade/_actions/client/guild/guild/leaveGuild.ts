"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";

export type LeaveGuildDto = {
  guild_id: number;
};

export type GuildMember = {
  guild_member_id: number;
  guild_id: number;
  user_id: number;
  joined_at: string;
  is_active: boolean;
};

export async function leaveGuild(
  variables: LeaveGuildDto,
): Promise<GuildMember> {
  try {
    const res = await customFetch("/guild/leave", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return res as GuildMember;
  } catch (err) {
    return Promise.reject(new Error("Failed at leaving a guild"));
  }
}
