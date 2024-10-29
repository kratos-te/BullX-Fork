"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { GuildMember } from "./leaveGuild";

export type KickGuildDto = {
  guild_id: number;
  user_id: number;
};

export async function kickGuild(variables: KickGuildDto): Promise<GuildMember> {
  try {
    const res = await customFetch("/guild/kick", {
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
    return Promise.reject(new Error("Failed at kicking a guild member"));
  }
}
