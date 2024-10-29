"use client";

import { useQuery } from "@tanstack/react-query";
import { getGuildById } from "@/tizz-trade-actions/client/guild/guild/getGuildById";

export function useGetGuildById(guildId?: number) {
  const guildQuery = useQuery({
    queryKey: ["getGuildById", guildId],
    queryFn: ({ queryKey }) => {
      const [_key, id] = queryKey;

      if (id === undefined) {
        return Promise.resolve(null);
      }

      return getGuildById(+id);
    },
  });

  return guildQuery;
}
