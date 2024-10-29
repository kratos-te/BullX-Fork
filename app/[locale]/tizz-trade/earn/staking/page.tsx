"use client";

import EarnData from "@/tizz-trade-components/EarnData/EarnData";

import VaultCard from "@/tizz-trade-components/Card/VaultCard";
import StatsCard from "@/tizz-trade-components/Card/StatsCard";
import DepositCard from "@/tizz-trade-components/Card/DepositCard";

export default function StakingPage() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="grid w-[1443px] grid-cols-3 gap-8 text-white">
        <EarnData />
        <div className="row-span-2 h-full">
          <VaultCard />
        </div>
        <div className="col-span-2">
          <StatsCard />
        </div>
        <div className="col-span-2 row-span-2">
          <DepositCard />
        </div>
      </div>
    </div>
  );
}
