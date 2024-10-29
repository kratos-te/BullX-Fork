"use client";

import { Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

export type TeamWinnerCardSkeletonProps = {
  rank: number;
};

const colors = ["border-yellow-500", "border-rose-500", "border-lime-500"];

export default function TeamWinnerCardSkeleton({
  rank,
}: TeamWinnerCardSkeletonProps) {
  return (
    <BaseCard
      classNames={{
        base: twMerge("p-3.5 gap-3.5 bg-neutral-900 rounded-lg", colors[rank]),
      }}
    >
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[100px] rounded-lg" />
        <div className="flex items-center gap-[10px]">
          <Skeleton className="h-[28px] w-[28px] rounded-full" />
          <Skeleton className="h-6 w-[200px] rounded-lg" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Skeleton className="h-3.5 w-[200px] rounded-lg" />
        <Skeleton className="h-8 w-[250px] rounded-lg" />
      </div>
    </BaseCard>
  );
}
