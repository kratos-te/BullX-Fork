"use client";
import { Tabs, Tab, TabsSlots } from "@nextui-org/react";
import { TabsProps } from "@nextui-org/react";

import { mergeClassNames } from "@/utils/mergeClassNames";

export type TabItem = {
  id: string;
  label: string;
  className?: string;
};

export type BaseTabsProps = TabsProps & {
  tabs: TabItem[];
};

export default function BaseTabs({ tabs, classNames, ...rest }: BaseTabsProps) {
  return (
    <Tabs
      fullWidth
      aria-label="BaseTabs"
      {...rest}
      classNames={mergeClassNames<TabsSlots>(
        {
          tab: "text-gray-400",
          cursor: "!bg-amber-300",
        },
        classNames,
      )}
    >
      {tabs.map((tab) => (
        <Tab key={tab.id} title={tab.label} className={tab.className} />
      ))}
    </Tabs>
  );
}
