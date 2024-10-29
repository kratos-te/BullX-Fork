"use client";

import { useRouter } from "@/navigation";

import TeamCreation from "@/tizz-trade-components/TeamWidgets/TeamCreation";

import { useGetUser } from "@/tizz-trade-hooks/guild/useGetUser";
import { useEffect } from "react";

export default function TeamOverviewPage() {
  const router = useRouter();
  const { data, isSuccess } = useGetUser();

  useEffect(() => {
    if (isSuccess && data && data.ownedGuilds.length > 0) {
      router.push(`/tizz-trade/team/overview/${data.ownedGuilds[0].guild_id}`);
    }

    if (isSuccess && data && data.guildMembers.length > 0) {
      router.push(
        `/tizz-trade/team/overview/${data.guildMembers[0].guild.guild_id}`,
      );
    }
  }, [data, isSuccess, router]);

  return <TeamCreation />;
}
