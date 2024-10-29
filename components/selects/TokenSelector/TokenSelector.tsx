"use client";

import { ReactElement } from "react";
import { SelectProps } from "@nextui-org/react";

import BaseSelector from "@/components/selects/BaseSelector/BaseSelector";

export type TokenSelectorItem = {
  id: string;
  label: string;
  icon: ReactElement;
};

export type TokenSelectorProps = Omit<SelectProps, "items" | "children"> & {
  items: TokenSelectorItem[];
};

export default function TokenSelector({ items, ...rest }: TokenSelectorProps) {
  return (
    <BaseSelector
      items={items}
      variant="bordered"
      aria-label="TokenSelector"
      labelPlacement="outside-left"
      defaultSelectedKeys={[items[0].id]}
      classNames={{
        base: "w-fit",
        mainWrapper: "justify-end",
        trigger: [
          "min-w-[110px] w-fit min-h-0 h-8 bg-neutral-800 px-2 py-1 border-zinc-700",
        ],
        popoverContent: "w-[140px] -translate-x-[30px]",
      }}
      {...rest}
    ></BaseSelector>
  );
}
