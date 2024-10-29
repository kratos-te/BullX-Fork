"use client";

import { customFetch } from "../fetchConfig";
import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { IGuild } from "@/types/index";

export type CreateGuildDto = {
  name: string;
  description: string;
  telegram?: string;
  twitter?: string;
  discord?: string;
  website?: string;
  picture?: string;
};

export async function createGuild(variables: CreateGuildDto): Promise<IGuild> {
  try {
    const res = await customFetch("/guild/create", {
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
    return Promise.reject(new Error("Failed at creating a new guild"));
  }
}
