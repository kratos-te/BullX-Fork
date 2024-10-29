"use client";

import { useQuery } from "@tanstack/react-query";
import { getJoinRequests } from "@/tizz-trade-actions/client/guild/guild/getJoinRequests";

export function useGetJoinRequests(guildId: number | null) {
  const query = useQuery({
    queryKey: ["getJoinRequests", guildId],
    queryFn: async () => {
      if (!guildId) {
        return Promise.resolve(null);
      }

      return getJoinRequests({ guildId });
    },
  });

  return query;
}
