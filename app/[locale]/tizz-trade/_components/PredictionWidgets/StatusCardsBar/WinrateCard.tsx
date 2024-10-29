import Image from "next/image";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

import zentoshiPoseSrc from "@/assets/images/zentoshi/tizz-zentoshi-pose-1.svg";

export function WinrateCard({ winRate }: { winRate: number }) {
  return (
    <BaseCard
      classNames={{
        base: "py-6 shrink-0 px-3.5 h-[118px] min-w-[300px] xl:flex-1 rounded-lg gap-6 items-center flex-row border-[#282834] bg-[#14141a]",
      }}
    >
      <Image
        src={zentoshiPoseSrc}
        className="h-[70px] w-[70px] rounded-xl border border-[#282834] bg-[#1e1e27]"
        alt="zentoshi"
      />
      <div className="flex w-fit flex-col gap-2">
        <span className="text-base font-bold text-white">Winrate</span>
        <span className="text-3xl font-bold leading-[38px] text-white">
          {winRate}
        </span>
      </div>
    </BaseCard>
  );
}
