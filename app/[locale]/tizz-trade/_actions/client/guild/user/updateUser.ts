"use client";

import { customFetch } from "../fetchConfig";
import { IGuildUser } from "@/types/index";

export type UpdateUserDto = {
  bio: string;
  discord: string;
  github: string;
  pfp: string;
  telgram: string;
  twitter: string;
  website: string;
};

export async function updateUser(
  variables: UpdateUserDto,
): Promise<IGuildUser> {
  try {
    const res = await customFetch("/user/auth", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as IGuildUser;
  } catch (err) {
    return Promise.reject(new Error("Failed at update user"));
  }
}
