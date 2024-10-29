"use client";

import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import { getPriceStr } from "@/utils/price";

export type PriceInfoProps = {
  price: number | null;
  percentage: number | null;
};

export default function PriceInfo({ price, percentage }: PriceInfoProps) {
  return (
    <div className="flex h-[40px] w-[120px] flex-row-reverse items-center gap-2 md:flex-col md:gap-0">
      <div className="text-bold w-full text-right text-lg font-semibold text-white/90">
        {price !== null ? getPriceStr(price) : "?"}
      </div>
      <div
        className={twMerge(
          "w-full text-right text-xs text-gray-400 md:-my-1",
          percentage !== null && percentage > 0
            ? "text-emerald-400"
            : "text-red-400",
        )}
      >
        {percentage !== null
          ? `${percentage > 0 ? "+" : ""}${percentage.toFixed(2)}%`
          : "?"}
      </div>
    </div>
  );
}
