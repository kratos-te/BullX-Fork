import { twMerge } from "tailwind-merge";

import { getPercentageStr } from "@/utils/price";

import ChartIcon from "@/components/icons/ChartIcon";

export type ChangeRateBadgeProps = {
  rate: number;
  className?: string;
};

export function ChangeRateBadge({ rate, className }: ChangeRateBadgeProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-1.5 rounded-full border border-[#24e4a4] bg-[#24e4a4]/20 px-2 text-base font-bold leading-[33.10px] text-[#24e4a4] xl:text-[22px]",
        className,
      )}
    >
      <ChartIcon width={20} height={14} />
      {getPercentageStr(rate)}%
    </div>
  );
}
