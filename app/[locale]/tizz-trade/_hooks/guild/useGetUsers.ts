"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/tizz-trade-actions/client/guild/user/getUsers";

export function useGetUsers() {
  const query = useQuery({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  return query;
}
