"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/tizz-trade-actions/client/guild/user/getUserById";
import { GuildApiError, IGuildUserWithDetails } from "@/types/index";

export function useGetUserById(userId?: number) {
  const query = useQuery<
    IGuildUserWithDetails | null,
    GuildApiError,
    IGuildUserWithDetails | null
  >({
    queryKey: ["getUserById", userId],
    queryFn: async () => {
      if (!userId) {
        return Promise.resolve(null);
      }

      return getUserById(userId);
    },
  });

  return query;
}
