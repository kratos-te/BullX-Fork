import { Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

export type TeamSummarySkeletonProps = {
  showActions?: boolean;
};

export default function TeamSummarySkeleton({
  showActions,
}: TeamSummarySkeletonProps) {
  return (
    <BaseCard
      classNames={{
        base: "p-4 bg-neutral-900 gap-6 flex flex-row w-full",
      }}
    >
      <Skeleton className="h-[250px] w-[300px] rounded-md" />

      <div className="flex w-full flex-col gap-6 md:w-[calc(100%-340px)]">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-[200px] rounded-lg" />
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-3/5 rounded-lg" />
        </div>

        <div
          className={twMerge(
            "flex w-full justify-between gap-3.5",
            showActions ? "flex-row" : "flex-col",
          )}
        >
          <div
            className={twMerge(
              "flex justify-between gap-3.5",
              showActions ? "w-3/5" : "w-full",
            )}
          >
            <Skeleton
              className={twMerge(
                "h-[60px] rounded-md",
                showActions ? "flex-1" : "w-1/3",
              )}
            />
            <Skeleton
              className={twMerge(
                "h-[60px] rounded-md",
                showActions ? "flex-1" : "w-1/3",
              )}
            />
            <Skeleton
              className={twMerge(
                "h-[60px] rounded-md",
                showActions ? "flex-1" : "w-1/3",
              )}
            />
          </div>
          <div
            className={twMerge(
              "flex justify-between gap-3.5",
              showActions ? "w-2/5" : "w-full",
            )}
          >
            <Skeleton
              className={twMerge(
                "h-[60px] rounded-md",
                showActions ? "flex-1" : "w-1/2",
              )}
            />
            <Skeleton
              className={twMerge(
                "h-[60px] rounded-md",
                showActions ? "flex-1" : "w-1/2",
              )}
            />
          </div>
        </div>

        {showActions && (
          <div className="flex justify-start gap-2">
            <Skeleton className="h-9 w-[100px] rounded-md" />
            <Skeleton className="h-9 w-[100px] rounded-md" />
          </div>
        )}
      </div>
    </BaseCard>
  );
}
