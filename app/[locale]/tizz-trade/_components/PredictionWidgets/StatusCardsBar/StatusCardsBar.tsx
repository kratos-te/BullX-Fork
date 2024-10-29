import { OverallBalanceCard } from "./OverallBalanceCard";
import { RankCard } from "./RankCard";
import { RewardCard } from "./RewardCard";
import { WinrateCard } from "./WinrateCard";

export function StatusCardsBar() {
  return (
    <div className="flex w-full items-center gap-6 overflow-x-auto">
      <RewardCard rewards={12345} />
      <RankCard rank={1234} />
      <OverallBalanceCard balance={1200} />
      <WinrateCard winRate={7} />
    </div>
  );
}
