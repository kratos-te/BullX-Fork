"use client";

import { UserJWT } from "@/types/index";

import { customFetch } from "../fetchConfig";
import { AuthDto } from "../user/signin";

export async function authAdmin(variables: AuthDto): Promise<UserJWT> {
  try {
    const res = await customFetch("/admin/auth", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as UserJWT;
  } catch (err) {
    return Promise.reject(new Error("Failed at auth admin"));
  }
}
