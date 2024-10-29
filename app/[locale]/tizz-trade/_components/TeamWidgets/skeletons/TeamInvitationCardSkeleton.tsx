import { Skeleton } from "@nextui-org/react";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

export default function TeamInvitationCardSkeleton() {
  return (
    <BaseCard
      classNames={{
        base: "py-6 px-5 bg-neutral-900 gap-5",
      }}
    >
      <Skeleton className="h-10 w-[200px] rounded-lg" />

      <div className="flex items-center gap-2.5">
        <Skeleton className="h-[28px] w-[28px] rounded-full" />
        <Skeleton className="h-6 w-[200px] rounded-lg" />
      </div>

      <div className="flex justify-between gap-3">
        <Skeleton className="h-10 w-[70px] rounded-lg" />
        <Skeleton className="h-10 w-[70px] rounded-lg" />
        <Skeleton className="h-10 w-[70px] rounded-lg" />
        <Skeleton className="h-10 w-[70px] rounded-lg" />
        <Skeleton className="h-10 w-[70px] rounded-lg" />
      </div>

      <div className="flex gap-1">
        <Skeleton className="h-10 w-[100px] rounded-lg" />
        <Skeleton className="h-10 w-[100px] rounded-lg" />
      </div>
    </BaseCard>
  );
}
