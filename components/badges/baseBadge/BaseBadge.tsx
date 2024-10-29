"use client";

import React from "react";

import ChartIcon from "@/components/icons/ChartIcon";

export type BaseBadgeProps = {
  value: string;
};

export default function BaseBadge({ value }: BaseBadgeProps) {
  return (
    <div className="inline-flex items-start justify-start gap-2 rounded-[90px] border border-emerald-400 bg-emerald-400 bg-opacity-20">
      <div className="flex items-center justify-start gap-1 px-2 py-1">
        <div className="relative h-2.5 w-[15px]">
          <ChartIcon />
        </div>
        <div className="text-nowrap text-base font-normal leading-normal text-emerald-400">
          {value}
        </div>
      </div>
    </div>
  );
}
