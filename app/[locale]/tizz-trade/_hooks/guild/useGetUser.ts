"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/tizz-trade-actions/client/guild/user/getUser";
import { defaultHeaders } from "@/tizz-trade-actions/client/guild/fetchConfig";
import { useUserJWT } from "./useUserJWT";

export function useGetUser() {
  const { userJwtQuery } = useUserJWT();

  const query = useQuery({
    queryKey: [
      "getUser",
      { data: userJwtQuery.data, isSuccess: userJwtQuery.isSuccess },
    ],
    queryFn: async () => {
      if (
        !(userJwtQuery.data && userJwtQuery.isSuccess) ||
        !defaultHeaders["Authorization"]
      ) {
        return Promise.resolve(null);
      }

      return getUser();
    },
  });

  return query;
}
