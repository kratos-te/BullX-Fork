import { Tooltip } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import { CollateralTypes } from "@/utils/tizz";
import { formatNumber } from "@/utils/price";
import PairIcon from "@/components/icons/PairIcon";

export type GroupPair = {
  from: string;
  to: string;
  name: string;
};

export type Group = {
  groupIndex: number;
  oiLong: number;
  oiShort: number;
  oiMax: number;
  pairs: GroupPair[];
};

export type GroupCardProps = {
  group: Group;
  collateralType: CollateralTypes;
};

export function GroupCard({ group, collateralType }: GroupCardProps) {
  const items = [
    {
      id: "long",
      label: "Open Interest (long)",
      value: `${formatNumber(group.oiLong)} / ${formatNumber(group.oiMax)} ${collateralType}`,
    },
    {
      id: "short",
      label: "Open Interest (short)",
      value: `${formatNumber(group.oiShort)} / ${formatNumber(group.oiMax)}  ${collateralType}`,
    },
  ];

  return (
    <BaseCard
      classNames={{
        base: "relative flex flex-col gap-4 p-6 border border-gray-800 bg-neutral-900 rounded-lg w-full md:w-[362px]",
      }}
    >
      <span className="absolute left-1 top-1 text-sm text-gray-400">
        {group.groupIndex}
      </span>

      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div key={item.id} className="flex w-full justify-between">
            <span className="text-sm text-gray-400">{item.label}</span>
            <span className="text-sm font-medium text-stone-200">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {group.pairs.map((pair) => (
          <Tooltip key={pair.name} placement="top" content={pair.name}>
            <div>
              <PairIcon from={pair.from} to={pair.to} height={18} width={18} />
            </div>
          </Tooltip>
        ))}
      </div>
    </BaseCard>
  );
}
