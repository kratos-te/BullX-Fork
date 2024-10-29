"use client";

import { useGetGuildById } from "@/tizz-trade-hooks/guild/useGetGuildById";
import { useGetUser } from "@/tizz-trade-hooks/guild/useGetUser";

import TeamJoinCard from "@/tizz-trade-components/TeamWidgets/TeamJoinCard";
import TeamViewer from "@/tizz-trade-components/TeamWidgets/TeamViewer";

export default function Page({ params }: { params: { guildId: string } }) {
  const usersQuery = useGetUser();
  const guildQuery = useGetGuildById(
    params.guildId ? +params.guildId : undefined,
  );

  const isOwner =
    usersQuery.data &&
    guildQuery.data &&
    usersQuery.data.id === guildQuery.data.owner_user_id;

  return (
    <>
      <TeamViewer />
      {isOwner && <TeamJoinCard guildId={+params.guildId} />}
    </>
  );
}
