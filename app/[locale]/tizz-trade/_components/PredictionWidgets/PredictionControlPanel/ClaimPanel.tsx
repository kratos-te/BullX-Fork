"use client";

import BaseSwitch from "@/components/switchs/BaseSwitch/BaseSwitch";
import ClaimIcon from "@/components/icons/ClaimIcon";

export type ClaimPanelProps = {
  balance: number;
  isClaim: boolean;
  onChange(isClaim: boolean): void;
};

export function ClaimPanel({ balance, isClaim, onChange }: ClaimPanelProps) {
  return (
    <div className="flex w-full items-center justify-between gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-lg font-bold leading-7 text-[#ffcc00] lg:text-xl">
          User Claimable
        </span>
        <div className="flex items-center gap-[5px] text-[#9494a8]">
          <ClaimIcon width={18} height={18} />
          <span className="text-sm font-medium leading-tight lg:text-base">
            Claimable Balance: ${balance}
          </span>
        </div>
      </div>

      <BaseSwitch
        label="Use Claim"
        isSelected={isClaim}
        setIsSelected={onChange}
      />
    </div>
  );
}
