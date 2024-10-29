"use client";

import type { ChartTable } from "@/types/index";
import { getEndpoints } from "./config";

export async function getChartTable({
  pairIndex,
  from,
  to,
  range,
}: {
  pairIndex: number;
  from: number;
  to: number;
  range: number;
}): Promise<ChartTable> {
  try {
    const res = await fetch(
      `${getEndpoints("pricingChart")}/${pairIndex}/${from}/${to}/${range}`,
    ).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as ChartTable;
  } catch (err) {
    return Promise.reject(new Error("Failed at fetching charts"));
  }
}
