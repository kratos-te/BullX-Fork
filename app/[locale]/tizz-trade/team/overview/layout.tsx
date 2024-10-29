import TeamStatus from "@/tizz-trade-components/TeamWidgets/TeamStatus";
import TeamWinners from "@/tizz-trade-components/TeamWidgets/TeamWinners";
import TeamLeaderboard from "@/tizz-trade-components/TeamWidgets/TeamLeaderboard";
import TeamInvitation from "@/tizz-trade-components/TeamWidgets/TeamInvitation";
import TeamViewer from "@/tizz-trade-components/TeamWidgets/TeamViewer";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col gap-6 md:flex-1">
      {/* <TeamStatus /> */}
      <div className="w-full xl:hidden">
        <TeamInvitation />
      </div>
      {children}
      <TeamWinners />
      <div className="w-full xl:hidden">
        <TeamViewer />
      </div>
      <TeamLeaderboard />
    </div>
  );
}
