"use server";

import "server-only";
import { Address } from "viem";

export async function verifyEmail({
  email,
  address,
}: {
  email: string;
  address: Address;
}): Promise<boolean> {
  try {
    const body = JSON.stringify({
      walletAddress: address,
      email,
    });

    console.log(body);

    const response = await fetch(
      "https://faucetbe.5thweb.io/api/verify-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      },
    );

    if (!response.ok) {
      throw new Error("Transaction failed.");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.success) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
}
