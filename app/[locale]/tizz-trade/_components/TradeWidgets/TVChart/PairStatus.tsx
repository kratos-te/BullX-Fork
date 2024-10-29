"use client";

import { Tooltip } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export type PairStatusProps = {
  label: string;
  content: string;
  extraContent?: string;
  contentClassName: string;
  extraContentClassName?: string;
  tooltip: string;
};

export default function PairStatus({
  label,
  content,
  extraContent,
  contentClassName,
  extraContentClassName,
  tooltip,
}: PairStatusProps) {
  return (
    <Tooltip
      placement="bottom"
      radius="sm"
      content={tooltip}
      delay={2000}
      offset={10}
      classNames={{
        base: "max-w-[300px]",
      }}
    >
      <div className="h-[40px] min-w-[100px] cursor-help px-[24px]">
        <div className="text-nowrap border-b-1 border-dotted text-xs text-gray-400">
          {label}
        </div>
        <div
          className={twMerge(
            "text-nowrap text-sm leading-tight ",
            contentClassName,
          )}
        >
          {content}
          {extraContent && (
            <span className={twMerge("ml-3", extraContentClassName)}>
              {extraContent}
            </span>
          )}
        </div>
      </div>
    </Tooltip>
  );
}
