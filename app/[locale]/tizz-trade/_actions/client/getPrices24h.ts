"use client";

import { getEndpoints } from "./config";

export async function getPrices24h(): Promise<(number | null)[]> {
  try {
    const res = await fetch(getEndpoints("prices24Ago")).then((res) =>
      res.json(),
    );

    if (res && res.type === "success") {
      return res.pricesBefore;
    }

    throw new Error();
  } catch (err) {
    return Promise.reject(new Error("Failed at fetching prices data"));
  }
}
