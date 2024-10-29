import { twMerge } from "tailwind-merge";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

export type TeamInfoCardProps = {
  label: string;
  value: string | number;
  className?: string;
};

export function TeamInfoCard({ label, value, className }: TeamInfoCardProps) {
  return (
    <BaseCard
      classNames={{
        base: twMerge(
          "min-w-[80px] px-2 py-2 bg-neutral-800 rounded-md gap-1",
          className,
        ),
      }}
    >
      <p className="text-sm capitalize leading-tight text-gray-400">{label}</p>
      <p className="truncate text-xl font-bold leading-tight text-white">
        {value}
      </p>
    </BaseCard>
  );
}
