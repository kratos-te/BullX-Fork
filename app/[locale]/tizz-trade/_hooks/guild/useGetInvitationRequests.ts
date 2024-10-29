"use client";

import { useQuery } from "@tanstack/react-query";
import { getInvitationRequests } from "@/tizz-trade-actions/client/guild/guild/getInvitationRequests";

export function useGetInvitationRequests(userId: number | null) {
  const query = useQuery({
    queryKey: ["getInvitationRequests", userId],
    queryFn: async () => {
      if (!userId) {
        return Promise.resolve(null);
      }

      return getInvitationRequests({ userId });
    },
  });

  return query;
}
