import CircleArrowUpIcon from "@/components/icons/arrow/CircleArrowUpIcon";
import { twMerge } from "tailwind-merge";

type BadgeType = "up" | "down";
type VariantType = "outlined" | "contained";

const borderClass: Record<VariantType, Record<BadgeType, string>> = {
  contained: {
    up: "border-[#35f9bb]",
    down: "border-[#f93636]",
  },
  outlined: {
    up: "border-[#4caf50]",
    down: "border-[#f93636]",
  },
};

const colorClass: Record<VariantType, Record<BadgeType, string>> = {
  contained: {
    up: "text-white",
    down: "text-white",
  },
  outlined: {
    up: "text-[#4caf50]",
    down: "text-[#f93636]",
  },
};

const bgClassByBadgeType: Record<BadgeType, string> = {
  up: "bg-gradient-to-b from-[#4caf50] to-[#246a54]",
  down: "bg-gradient-to-b from-[#ff6767] to-[#993d3d]",
};

export type PayoutBadgeProps = {
  variant: VariantType;
  badgetType: BadgeType;
  payout: number;
  className?: string;
};

export function PayoutBadge({
  variant,
  payout,
  badgetType,
  className,
}: PayoutBadgeProps) {
  return (
    <div
      className={twMerge(
        "flex h-[26px] min-w-[137px] items-center justify-center gap-[6px] rounded-full border text-xs font-medium leading-[18px] text-white shadow 2xl:h-[38px] 2xl:text-base",
        borderClass[variant][badgetType],
        colorClass[variant][badgetType],
        variant === "contained"
          ? bgClassByBadgeType[badgetType]
          : "bg-transparent",
        badgetType === "down" && "flex-row-reverse",
        className,
      )}
    >
      <span className="2xl:hidden">
        <CircleArrowUpIcon
          width={14}
          height={14}
          className={twMerge(
            colorClass[variant][badgetType],
            badgetType === "up" ? "" : "rotate-180",
          )}
        />
      </span>
      <span className="hidden 2xl:inline-block">
        <CircleArrowUpIcon
          width={18}
          height={18}
          size={14}
          className={twMerge(
            colorClass[variant][badgetType],
            badgetType === "up" ? "" : "rotate-180",
          )}
        />
      </span>
      <span>{payout}x Payout</span>
    </div>
  );
}
