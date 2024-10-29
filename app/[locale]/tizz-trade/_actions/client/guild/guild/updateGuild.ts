"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { CreateGuildDto } from "./createGuild";
import { IGuild } from "@/types/index";

export type UpdateGuildDto = CreateGuildDto & {
  guild_id: number;
};

export async function updateGuild(variables: UpdateGuildDto): Promise<IGuild> {
  try {
    const res = await customFetch("/guild/update", {
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
    return Promise.reject(new Error("Failed at updating a guild"));
  }
}
