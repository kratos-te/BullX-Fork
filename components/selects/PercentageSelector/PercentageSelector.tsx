"use client";

import { SelectProps } from "@nextui-org/react";
import BaseSelector from "@/components/selects/BaseSelector/BaseSelector";
import { mergeClassNames } from "@/utils/mergeClassNames";

export type PercentageSelectorItem = {
  id: string;
  label: string;
  className?: string;
};

export type PercentageSelectorProps = Omit<
  SelectProps,
  "items" | "children"
> & {
  items: PercentageSelectorItem[];
};

export default function PercentageSelector({
  items,
  classNames,
  ...rest
}: PercentageSelectorProps) {
  return (
    <BaseSelector
      items={items}
      aria-label="PercentageSelector"
      defaultSelectedKeys={[items[0].id]}
      classNames={mergeClassNames(
        {
          base: "w-fit",
          value: "text-gray-400",
          mainWrapper: "w-[88px] flex-row justify-end",
          popoverContent: "w-[130px] -translate-x-[30px]",
          trigger: ["h-9 rounded-md border border-zinc-700"],
        },
        classNames,
      )}
      {...rest}
    />
  );
}
