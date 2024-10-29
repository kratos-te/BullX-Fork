"use client";

import { customFetch } from "../fetchConfig";
import { UserJWT } from "@/types/index";

export async function refreshToken(): Promise<UserJWT> {
  try {
    const res = await customFetch("/user/refreshToken", {
      method: "post",
      body: JSON.stringify({}),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res.jwtToken as UserJWT;
  } catch (err) {
    return Promise.reject(new Error("Failed at refresh token"));
  }
}
