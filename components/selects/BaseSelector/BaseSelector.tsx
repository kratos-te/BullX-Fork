"use client";

import { ReactElement } from "react";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { mergeClassNames } from "@/utils/mergeClassNames";

export type BaseSelectorItem = {
  id: string;
  label: string;
  icon?: ReactElement;
  className?: string;
};

export type BaseSelectorProps = Omit<SelectProps, "items" | "children"> & {
  items: BaseSelectorItem[];
};

export default function BaseSelector({
  items,
  classNames,
  ...rest
}: BaseSelectorProps) {
  return (
    <Select
      items={items}
      variant="bordered"
      aria-label="BaseSelector"
      labelPlacement="outside-left"
      defaultSelectedKeys={[items[0].id]}
      classNames={mergeClassNames(
        {
          base: "w-fit h-fit",
          mainWrapper: "flex flex-row",
          trigger: [
            "min-h-0 h-10 bg-neutral-800 px-2 py-1 rounded-md border items-center gap-0 border-gray-800",
          ],
          value: "text-center text-white text-sm font-semibold leading-[14px]",
          innerWrapper:
            "!min-h-[18px] w-fit justify-center items-center gap-[7.60px] inline-flex",
          selectorIcon: "right-2 w-unit-5 h-unit-5",
          popoverContent: "rounded-xl border-stroke",
        },
        classNames,
      )}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center justify-start gap-2">
            {item.data?.icon}
            {item.data?.label || ""}
          </div>
        ));
      }}
      {...rest}
    >
      {(item) => (
        <SelectItem key={item.id} textValue={item.label}>
          <div className={twMerge("flex items-center gap-2", item.className)}>
            {item.icon}
            {item.label}
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
