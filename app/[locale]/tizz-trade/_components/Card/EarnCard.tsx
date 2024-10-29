"use client";

import BaseBadge from "@/components/badges/baseBadge/BaseBadge";
import BaseCard from "@/components/cards/BaseCard/BaseCard";

import EarnInfo, { EarnInfoItem } from "./EarnInfo";

export type EarnCardItem = {
  title: string;
  percentage: number;
  icon: React.ReactNode;
  info: EarnInfoItem[];
};

export type EarnCardProps = {
  isSelected: boolean;
  onClick?(): void;
  earnData: EarnCardItem;
};

export default function EarnCard({
  earnData,
  onClick,
  isSelected,
}: EarnCardProps) {
  return (
    <BaseCard
      onClick={onClick}
      classNames={{
        base: `p-6 bg-neutral-900 rounded-lg ${isSelected ? "border-2 border-yellow-500" : "border-gray-800"} justify-start items-start gap-8 inline-flex`,
      }}
    >
      <div className="inline-flex h-[136px] w-full flex-col items-start justify-start gap-6">
        <div className="inline-flex items-center justify-start gap-3.5 self-stretch">
          <div className="flex items-center justify-start gap-3.5">
            {earnData.icon}
            <div className="text-3xl font-bold leading-[38px] text-white">
              {earnData.title}
            </div>
            <BaseBadge value={`${earnData.percentage}`} />
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5">
            <div className="flex flex-col items-end justify-center gap-2.5"></div>
          </div>
        </div>
        <div className="h-[0px] self-stretch border border-gray-800"></div>
        <div className="flex h-[50px] flex-col items-start justify-start gap-6 self-stretch">
          <div className="flex items-start gap-3.5 self-stretch">
            {earnData.info.map((item, index) => (
              <EarnInfo
                key={index}
                item={item}
                className={index === 0 ? "w-[106px] flex-grow-0" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
