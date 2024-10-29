"use client";

import { useQuery } from "@tanstack/react-query";
import { getGuilds } from "@/tizz-trade-actions/client/guild/guild/getGuilds";

export function useGetGuilds() {
  const guildsQuery = useQuery({
    queryKey: ["getGuilds"],
    queryFn: getGuilds,
  });

  return guildsQuery;
}
