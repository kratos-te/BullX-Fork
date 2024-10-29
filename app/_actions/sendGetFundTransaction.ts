"use server";

import "server-only";
import { Address } from "viem";
import { decodeIp } from "@/utils/index";

export async function sendGetFundTransaction({
  address,
  email,
  verificationToken,
  captcha,
  ip,
  encoded,
}: {
  address: Address;
  email: string;
  verificationToken: string;
  captcha: string;
  ip: string;
  encoded: string;
}): Promise<{ error?: string; hash?: string; status: number }> {
  try {
    if (decodeIp(encoded) !== ip) {
      return { error: "Invalid IP", status: 400 };
    }

    let hash;

    try {
      const body = JSON.stringify({
        walletAddress: address,
        ip,
        captcha,
        encoded,
        email,
        verificationToken,
      });

      console.log(body);

      const response = await fetch("https://faucetbe.5thweb.io/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Client-IP": ip as string,
        },
        body: body,
      });

      if (response?.status === 400) {
        return { status: 429, error: "Invalid captcha." };
      }

      if (response?.status === 429) {
        return { status: 429, error: "24 Hour Limit Error" };
      }

      if (!response.ok) {
        throw new Error("Transaction failed.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      hash = data.txHash;
    } catch (e: any) {
      return {
        status: 329,
        error: e?.cause?.details as string,
      };
    }

    return {
      status: 200,
      hash,
    };
  } catch (e: any) {
    return {
      status: 500,
      error: e?.cause?.details as string,
    };
  }
}
