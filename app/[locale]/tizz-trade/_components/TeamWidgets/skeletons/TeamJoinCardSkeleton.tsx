import { Skeleton } from "@nextui-org/react";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

export default function TeamJoinCardSkeleton() {
  return (
    <BaseCard
      classNames={{
        base: "p-6 bg-neutral-900 gap-6",
      }}
    >
      <Skeleton className="h-6 w-[200px] rounded-lg" />

      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-[100px] rounded-lg" />
        <Skeleton className="h-10 w-[100px] rounded-lg" />
      </div>

      <Skeleton className="h-10 w-[100px] rounded-lg" />
    </BaseCard>
  );
}
