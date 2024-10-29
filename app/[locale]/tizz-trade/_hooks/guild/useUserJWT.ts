"use client";

import { useCallback, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useDisconnect } from "wagmi";

import { setHeader } from "@/tizz-trade-actions/client/guild/fetchConfig";

import { UserJWT } from "@/types/index";
import { singin } from "@/tizz-trade-actions/client/guild/user/signin";
import { refreshToken } from "@/tizz-trade-actions/client/guild/user/refreshToken";

const LOCAL_STORAGE_KEY = "user-jwt";

export function useUserJWT() {
  const { disconnect } = useDisconnect();

  const queryClient = useQueryClient();
  const userJwtQuery = useQuery({
    queryKey: [LOCAL_STORAGE_KEY],
    queryFn: async () => {
      try {
        const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!data) {
          return Promise.resolve(null);
        }

        return Promise.resolve(JSON.parse(data) as UserJWT);
      } catch (err) {
        return Promise.reject(
          new Error("Failed at getting jwt from localstorage"),
        );
      }
    },
  });

  const changeJWTMutation = useMutation({
    mutationFn: (newJWT: UserJWT | null) => {
      try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newJWT));

        return Promise.resolve(newJWT);
      } catch (err) {
        return Promise.reject(
          new Error("Failed at saving jwt from localstorage"),
        );
      }
    },
    onSuccess: (newJWT: UserJWT | null) => {
      queryClient.setQueriesData(
        { queryKey: [LOCAL_STORAGE_KEY] },
        () => newJWT,
      );
    },
  });
  const { mutate: signinMutation } = useMutation({
    mutationFn: singin,
    onSuccess: (data) => {
      changeJWTMutation.mutate(data);
    },
  });
  const refreshMuation = useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      changeJWTMutation.mutate(data);
    },
  });

  const signout = useCallback(() => {
    changeJWTMutation.mutate(null);
  }, [changeJWTMutation]);

  useEffect(() => {
    if (userJwtQuery.data) {
      if (new Date(userJwtQuery.data.expirationTime) > new Date()) {
        setHeader("Authorization", `Bearer ${userJwtQuery.data.token}`);
      } else {
        signout();
        disconnect();
      }
    }
  }, [userJwtQuery.data, signout, disconnect]);

  return {
    userJwtQuery,
    signin: signinMutation,
    refreshToken: refreshMuation.mutate,
    signout,
  };
}
