"use client";

import { useRouter } from "@/navigation";

import { useUserJWT } from "@/tizz-trade-hooks/guild/useUserJWT";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { userJwtQuery } = useUserJWT();

  useEffect(() => {
    if (!userJwtQuery.data && userJwtQuery.isFetched) {
      router.push("/tizz-trade/team/overview/");
    }
  }, [router, userJwtQuery.data, userJwtQuery.isFetched]);

  return children;
}
