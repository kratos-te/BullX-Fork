"use client";

import { useMemo } from "react";
import BaseTabs, { BaseTabsProps, TabItem } from "../BaseTabs/BaseTabs";
import { mergeClassNames } from "@/utils/mergeClassNames";
import { TabsSlots } from "@nextui-org/react";

export type SmallTabsProps = Omit<BaseTabsProps, "tabs"> & {
  tabs: TabItem[];
};

export default function SmallTab({
  tabs,
  selectedKey,
  ...rest
}: SmallTabsProps) {
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
          tab: "border-r-1 border-r-gray-400 !rounded-none border-gray-800 !w-fit",
          panel: "absolute w-full h-full pt-0",
          tabList: "bg-transparent",
          cursor: "!bg-transparent shadow-none rounded-none !p-0",
        },
        rest.classNames,
      )}
    />
  );
}
