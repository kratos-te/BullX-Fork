"use client";

import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import teamPic from "@/assets/images/zentoshi/teamTrader.svg";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import { IGuildWithAggregation } from "@/types/index";
import CustomImage from "@/components/image/CustomImage";

export type TeamWinnerCardProps = {
  guild: IGuildWithAggregation;
};

const colors = ["border-yellow-500", "border-rose-500", "border-lime-500"];

export default function TeamWinnerCard({ guild }: TeamWinnerCardProps) {
  const t = useTranslations("Trade-TeamWinnerCard");

  return (
    <BaseCard
      classNames={{
        base: twMerge(
          "p-3.5 gap-3.5 bg-neutral-900 rounded-lg min-w-[266px] w-1/3",
          colors[guild.rank],
        ),
      }}
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold leading-tight text-amber-300">
          {`#${guild.rank}`} {t("place")}
        </p>
        <div className="flex items-center gap-[10px]">
          <CustomImage
            src={guild.picture}
            defaultSrc={teamPic}
            width={28}
            height={28}
            className="h-[28px] w-[28px] rounded-full"
            alt="team picture"
          />

          <p className="text-lg font-semibold leading-7 text-white">
            {guild.name}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm leading-tight text-gray-400">
          {t("total-winnings")}
        </p>
        <div className="text-3xl font-semibold leading-[38px] text-white">
          {guild.totalOverAllWins}
        </div>
      </div>
    </BaseCard>
  );
}
