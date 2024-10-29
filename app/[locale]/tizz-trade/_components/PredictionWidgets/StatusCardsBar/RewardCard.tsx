import Image from "next/image";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

import rewardSrc from "@/assets/images/botanix-faucet.svg";
import { Button } from "@nextui-org/react";

export function RewardCard({ rewards }: { rewards: number }) {
  return (
    <BaseCard
      classNames={{
        base: "py-6 shrink-0 px-3.5 h-[118px] min-w-[300px] xl:flex-1 rounded-lg gap-6 items-center flex-row border-[#282834] border-b-2 border-b-[#ffb700] bg-gradient-to-b from-[#14141a] to-[#4f401a]",
      }}
    >
      <div className="h-[70px] w-[70px] shrink-0 overflow-hidden rounded-xl border border-[#282834] bg-[#1e1e2730]">
        <Image
          src={rewardSrc}
          className="w-[70px] object-cover"
          alt="zentoshi"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <span className="text-base font-bold text-white">Rewards</span>
        <div className="flex min-w-[217px] items-center justify-between gap-3.5">
          <span className="text-3xl font-bold leading-[38px] text-[#ffcc00]">
            ${rewards}
          </span>

          <Button className="flex h-9 rounded-md border border-[#ffcc00] bg-gradient-to-r from-[#ffb700] via-[#ffb700] to-[#ff7b00] px-6 py-2 text-sm font-bold leading-tight text-black">
            Claim
          </Button>
        </div>
      </div>
    </BaseCard>
  );
}
