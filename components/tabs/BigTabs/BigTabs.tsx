"use client";

import { useMemo } from "react";
import { TabsSlots } from "@nextui-org/react";

import { mergeClassNames } from "@/utils/mergeClassNames";

import BaseTabs, { BaseTabsProps, TabItem } from "../BaseTabs/BaseTabs";

export type BigTabsProps = Omit<BaseTabsProps, "tabs"> & {
  tabs: TabItem[];
};

export default function BigTabs({ tabs, selectedKey, ...rest }: BigTabsProps) {
  const newTabs = useMemo(
    () =>
      tabs.map((tab) => ({
        id: tab.id,
        label: tab.label,
      })),
    [tabs],
  );

  return (
    <BaseTabs
      {...rest}
      variant="underlined"
      tabs={newTabs}
      classNames={mergeClassNames<TabsSlots>(
        {
          cursor:
            "w-full h-[1px] bg-amber-300 group-data-[selected=true]:text-neutral-900",
          tabList: "p-0 gap-0 !border-stroke border-b-[1px]",
          tab: "p-0 h-10 bg-transparent",
          tabContent:
            "justify-center w-full font-semibold leading-9 tracking-wide group-data-[selected=true]:text-amber-300",
        },
        rest.classNames,
      )}
    />
  );
}
