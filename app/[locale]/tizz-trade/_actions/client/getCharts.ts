"use client";

import type { Chart } from "@/types/index";
import { getEndpoints } from "./config";

export async function getPricingCharts(): Promise<Chart> {
  try {
    const res = await fetch(getEndpoints("pricingChart")).then((res) =>
      res.json(),
    );

    if (!res) {
      throw new Error();
    }

    return res as Chart;
  } catch (err) {
    return Promise.reject(new Error("Failed at fetching pricing charts"));
  }
}
