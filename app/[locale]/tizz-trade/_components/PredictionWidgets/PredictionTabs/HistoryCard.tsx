import { Button } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

import { ChangeRateBadge } from "../components/ChangeRateBadge";
import { PayoutBadge } from "../components/PayoutBadge";

export type History = {
  expired: boolean;
  predictionId: number;
  closedPrice: number;
  changeRate: number;
  lockedPrize: number;
  prizePool: number;
  userDeposit: number;
  rewards: number;
  upPayout: number;
  downPayout: number;
};

export type HistoryCardProps = {
  history: History;
};

export function HistoryCard({ history }: HistoryCardProps) {
  const prizeItems = [
    {
      id: "lockedPrize",
      label: "Locked Prize",
      value: `$${history.lockedPrize}`,
    },
    {
      id: "prizePool",
      label: "Prize Pool",
      value: `${history.prizePool} BTC`,
    },
  ];

  const depositItems = [
    {
      id: "yourDeposit",
      label: "Your Deposit",
      value: `${history.userDeposit} BTC`,
    },
    {
      id: "rewards",
      label: "Rewards",
      value: `${history.rewards} BTC`,
      className: history.rewards >= 0 ? "text-[#027a48]" : "text-[#b42318]",
    },
  ];

  return (
    <BaseCard
      classNames={{
        base: "px-[18px] shrink-0 py-6 rounded-[14px] w-[325px] gap-8 md:w-[391px]",
      }}
    >
      <div className="flex items-center justify-between text-[#aaaaaa]">
        <span className="text-base font-semibold md:text-lg">
          {history.expired ? "Expired" : ""}
        </span>
        <span className="rounded-lg border border-[#383848] bg-[#1e1e27] px-5 py-2 text-xs font-medium leading-[14px]">
          #{history.predictionId}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3.5">
          <span className="text-lg font-semibold leading-7 text-[#aaaaaa]">
            Closed Prize
          </span>

          <div className="flex items-center gap-3.5">
            <span className="text-3xl font-bold leading-[38px] text-[#027a48] md:text-5xl">
              ${history.closedPrice}
            </span>

            <ChangeRateBadge rate={history.changeRate} />
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            {prizeItems.map((item) => (
              <div key={item.id} className="flex w-1/2 flex-col gap-1">
                <span className="text-sm font-bold leading-tight text-[#9494a8]">
                  {item.label}
                </span>
                <span className="text-base font-bold text-[#aaaaaa] md:text-xl">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            {depositItems.map((item) => (
              <div key={item.id} className="flex w-1/2 flex-col gap-1">
                <span className="text-sm font-bold leading-tight text-[#9494a8]">
                  {item.label}
                </span>
                <span
                  className={twMerge(
                    "text-base font-bold text-[#aaaaaa] md:text-xl",
                    item.className,
                  )}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <PayoutBadge
          variant="outlined"
          payout={history.upPayout}
          badgetType="up"
          className="w-full"
        />
        <PayoutBadge
          variant="outlined"
          payout={history.downPayout}
          badgetType="down"
          className="w-full"
        />
      </div>

      <Button className="h-10 rounded-lg border border-[#ff8744] bg-gradient-to-t from-[#ff8744] to-[#fda403] px-[30px] py-2.5 text-justify text-sm font-bold leading-tight text-black shadow">
        Round Won
      </Button>
    </BaseCard>
  );
}
