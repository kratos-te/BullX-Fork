"use client";

import { useState, Key } from "react";
import { useTranslations } from "next-intl";

import BigTabs from "@/components/tabs/BigTabs/BigTabs";
import { TabItem } from "@/components/tabs/BaseTabs/BaseTabs";

export default function PortfolioTabBar() {
  const t = useTranslations("Trade-PortfolioTabBar");

  const tabItems: TabItem[] = [
    {
      id: "dashboard",
      label: t("dashboard"),
    },
    {
      id: "history",
      label: t("history"),
    },
    {
      id: "rewards",
      label: t("rewards"),
    },
  ];

  const [selectedBigTabKey, setSelectedBigTabKey] = useState<string>(
    tabItems[0].id,
  );

  const handleBigTabSelectionChange = (value: Key) => {
    setSelectedBigTabKey(value as string);
  };

  return (
    <div className="col-span-2 mb-[32px] sm:col-span-2 sm:block md:hidden lg:hidden xl:hidden">
      <BigTabs
        tabs={tabItems}
        selectedKey={selectedBigTabKey}
        onSelectionChange={handleBigTabSelectionChange}
      />
    </div>
  );
}
