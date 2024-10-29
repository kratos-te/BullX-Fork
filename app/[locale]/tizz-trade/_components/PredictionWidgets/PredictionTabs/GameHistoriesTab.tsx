import { HistoryCard, History } from "./HistoryCard";

const mockHistory: History = {
  expired: true,
  predictionId: 12345,
  closedPrice: 52300,
  changeRate: 12.7,
  lockedPrize: 515.45,
  prizePool: 2.45,
  userDeposit: 0.15,
  rewards: 500,
  upPayout: 1.23,
  downPayout: 1.45,
};

function getMockHistories(count: number) {
  return Array.from(Array(count).keys()).map((add) => ({
    ...mockHistory,
    predictionId: mockHistory.predictionId + add,
  }));
}

const mockHistories = getMockHistories(30);

export function GameHistoriesTab() {
  return (
    <div className="flex w-full shrink-0 items-center gap-6 overflow-hidden">
      {mockHistories.map((item) => (
        <HistoryCard key={item.predictionId} history={item} />
      ))}
    </div>
  );
}
