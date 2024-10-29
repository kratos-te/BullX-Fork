"use client";

import { useQuery } from "@tanstack/react-query";

import { getPricingCharts } from "@/tizz-trade-actions/client/getCharts";

export function usePricingCharts() {
  const { data } = useQuery({
    queryKey: ["charts"],
    queryFn: getPricingCharts,
  });

  return data;
}
