"use client";

import { useQuery } from "@tanstack/react-query";

import { getPrices24h } from "@/tizz-trade-actions/client/getPrices24h";

export function usePricesBefore24h() {
  const { data } = useQuery({
    queryKey: ["prices-24h-ago"],
    queryFn: getPrices24h,
  });

  return data;
}
