import TeamSummary from "@/tizz-trade-components/TeamWidgets/TeamSummary";

export default function TeamDetailPage({
  params,
}: {
  params: { guildId: string };
}) {
  return <TeamSummary guildId={+params.guildId} showActions />;
}
