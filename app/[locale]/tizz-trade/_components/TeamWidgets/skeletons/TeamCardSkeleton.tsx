import { Skeleton } from "@nextui-org/react";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

export default function TeamCardSkeleton() {
  return (
    <BaseCard
      classNames={{
        base: "flex-row justify-between gap-3 bg-neutral-800 p-3.5",
      }}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-[48px] w-[48px] rounded-full" />

        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-[200px] rounded-lg" />
          <Skeleton className="h-3 w-[200px] rounded-lg" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-[70px] rounded-lg" />
        <div className="flex items-center">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <p className="ml-1 text-lg font-semibold leading-[20px]">+</p>
        </div>
      </div>
    </BaseCard>
  );
}
