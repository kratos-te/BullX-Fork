"use client";

import TeamSummary from "@/tizz-trade-components/TeamWidgets/TeamSummary";
import TeamMembers from "@/tizz-trade-components/TeamWidgets/TeamMembers";
import TeamViewer from "@/tizz-trade-components/TeamWidgets/TeamViewer";

import { useGetGuildById } from "@/tizz-trade-hooks/guild/useGetGuildById";
import { useGetUser } from "@/tizz-trade-hooks/guild/useGetUser";
import TeamJoinCard from "@/tizz-trade-components/TeamWidgets/TeamJoinCard";

export default function TeamDetailPage({
  params,
}: {
  params: { guildId: string };
}) {
  const usersQuery = useGetUser();
  const guildQuery = useGetGuildById(
    params.guildId ? +params.guildId : undefined,
  );

  const isOwner =
    usersQuery.data &&
    guildQuery.data &&
    usersQuery.data.id === guildQuery.data.owner_user_id;

  return (
    <div className="flex flex-col gap-6 p-2.5 md:flex-1 md:p-0">
      {isOwner && (
        <div className="w-full lg:hidden">
          <TeamJoinCard guildId={+params.guildId} />
        </div>
      )}
      <TeamSummary guildId={+params.guildId} />
      <div className="w-full xl:hidden">
        <TeamViewer />
      </div>
      <TeamMembers guildId={+params.guildId} />
    </div>
  );
}
