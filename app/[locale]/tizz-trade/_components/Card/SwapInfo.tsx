"use client";

import { twMerge } from "tailwind-merge";

export type EarnInfoItem = {
  value: number | string;
  label: string;
  icon?: React.ReactNode;
};

export type EarnInfoProps = {
  className?: string;
  item: EarnInfoItem;
};

export default function SwapInfo({ className, item }: EarnInfoProps) {
  return (
    <div
      className={twMerge(
        "flex w-[167px] flex-col items-start justify-start gap-1",
        className,
      )}
    >
      <div className="text-right text-base font-normal leading-tight text-gray-400">
        {item.label}
      </div>
      <div className="flex h-[38px] w-full items-center justify-start gap-2">
        <div className="text-right text-xl font-semibold leading-[30px] text-white">
          {typeof item.value === "number"
            ? item.value.toLocaleString()
            : item.value}
        </div>
        {item.icon ? item.icon : ""}
      </div>
    </div>
  );
}
