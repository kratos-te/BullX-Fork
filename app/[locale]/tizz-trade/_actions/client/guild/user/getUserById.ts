"use client";

import { convertResToGuildError, isGuildApiError } from "@/utils/index";
import { customFetch } from "../fetchConfig";
import { IGuildUserWithDetails } from "@/types/index";

export async function getUserById(
  userId: number,
): Promise<IGuildUserWithDetails> {
  try {
    const res = await customFetch(`/user/${userId}`, {
      method: "get",
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return res as IGuildUserWithDetails;
  } catch (err) {
    return Promise.reject(new Error("Failed at getting user by user id"));
  }
}
