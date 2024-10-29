"use client";

import { Address } from "viem";

import { customFetch } from "../fetchConfig";
import { UserJWT } from "@/types/index";
import { convertResToGuildError, isGuildApiError } from "@/utils/index";

export type AuthDto = {
  wallet_address: Address;
  signature: string;
  timestamp: number;
};

export async function singin(variables: AuthDto): Promise<UserJWT> {
  try {
    const res = await customFetch("/user/auth", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    if (isGuildApiError(res)) {
      return Promise.reject(convertResToGuildError(res));
    }

    return {
      ...res,
      wallet_address: variables.wallet_address,
    } as UserJWT;
  } catch (err) {
    return Promise.reject(new Error("Failed at sigin to the guild service"));
  }
}
