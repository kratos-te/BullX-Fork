"use client";

import BaseSwitch from "@/components/switchs/BaseSwitch/BaseSwitch";
import BaseSelector from "@/components/selects/BaseSelector/BaseSelector";
import { ArrowButtonGroup } from "./ArrowButtonGroup";

export type PredictionTabControlbarProps = {
  showOnlyMyRound: boolean;
  onChangeShowOnlyMyRound(value: boolean): void;
  onClickNext(): void;
  onClickPrev(): void;
};

export default function PredictionTabControlbar({
  showOnlyMyRound,
  onChangeShowOnlyMyRound,
  onClickPrev,
  onClickNext,
}: PredictionTabControlbarProps) {
  const items = [
    {
      id: "all",
      label: "All",
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <BaseSwitch
          label="Show Only My Rounds"
          isSelected={showOnlyMyRound}
          setIsSelected={onChangeShowOnlyMyRound}
          classNames={{
            label: "text-gray-400 font-semibold",
          }}
        />

        <BaseSelector
          classNames={{
            base: "w-[58px] bg-none border-none",
            value: "pl-2 justify-center text-sm font-semibold text-gray-400",
            selectorIcon: "text-gray-400",
            trigger: "p-0 border-none bg-transparent",
            popoverContent: "w-fit",
          }}
          items={items}
        />
      </div>

      <span className="md:hidden">
        <ArrowButtonGroup onClickNext={onClickNext} onClickPrev={onClickPrev} />
      </span>
    </div>
  );
}
