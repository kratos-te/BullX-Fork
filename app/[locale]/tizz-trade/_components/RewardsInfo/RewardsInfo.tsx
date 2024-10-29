"use client";
import { useState, Key } from "react";

import BaseTabs, { TabItem } from "@/components/tabs/BaseTabs/BaseTabs";
import DetailedInfo, { DetailedInfoItem } from "./DetailedInfo";
import SimpleInfo, { SimpleInfoItem } from "./SimpleInfo";

const tabItems: TabItem[] = [
  {
    id: "simple",
    label: "Simple",
  },
  {
    id: "detailed",
    label: "Detailed",
  },
];

const detailedInfo: DetailedInfoItem[] = [
  {
    title: "Fees",
    label_1: "Your Total Weekly Fees Paid",
    label_2: "Total Protocol Fees",
    label_3: "Your Est. Rewards",
    label_4: "Category Rewards",
    label_5: "Your Reward Share",
    value_1: 0.0,
    value_2: 82300.44,
    value_3: 0.0,
    value_4: 42148.31,
    value_5: 0.0,
  },
  {
    title: "PnL",
    label_1: "Your Total Weekly PnL",
    label_2: "Total Protocol Positive PnL",
    label_3: "Your Est. Rewards",
    label_4: "Category Rewards",
    label_5: "Your Reward Share",
    value_1: 0.0,
    value_2: 82300.44,
    value_3: 0.0,
    value_4: 29423.08,
    value_5: 0.0,
  },
  {
    title: "PnL(%)",
    label_1: "Your Total Weekly PnL (%)",
    label_2: "Total Protocol Positive PnL (%)",
    label_3: "Your Est. Rewards",
    label_4: "Category Rewards",
    label_5: "Your Reward Share",
    value_1: 0.0,
    value_2: 82300.44,
    value_3: 0.0,
    value_4: 14711.54,
    value_5: 0.0,
  },
  {
    title: "Loyalty Points",
    label_1: "Your Total Weekly PnL (%)",
    label_2: "Total Protocol Positive PnL (%)",
    label_3: "Your Est. Rewards",
    label_4: "Category Rewards",
    label_5: "Your Reward Share",
    value_1: 0.0,
    value_2: 82300.44,
    value_3: 0.0,
    value_4: 14711.54,
    value_5: 0.0,
    loyal_data: {
      time: "6h 11m 9s",
      day: 1,
      fee: 0.0,
      points: 0,
    },
  },
];

const simpleInfo: SimpleInfoItem[] = [
  {
    title: "Fee",
    value_1: 0.0,
    value_2: 0.0,
    unit_text: "weekly fees",
  },
  {
    title: "PnL",
    value_1: 0.0,
    value_2: 0.0,
    unit_text: "weekly PnL",
  },
  {
    title: "PnL (%)",
    value_1: 0.0,
    value_2: 0.0,
    unit_text: "weekly PnL",
  },
  {
    title: "Loyalty Points",
    value_1: 0.0,
    value_2: 0.0,
    unit_text: "daily fees",
    time: "4h 29m 12s",
  },
];

export default function RewardsInfo() {
  const [selectedTabKey, setSelectedTabKey] = useState<string>(tabItems[0].id);

  const handleBaseTabSelectionChange = (value: Key) => {
    setSelectedTabKey(value as string);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="flex justify-between">
          <div className="w-[180px]">
            <BaseTabs
              variant="bordered"
              tabs={tabItems}
              selectedKey={selectedTabKey}
              onSelectionChange={handleBaseTabSelectionChange}
              classNames={{
                cursor:
                  "!bg-gray-900 !rounded-sm !border-zinc-800 h-[22px] items-center top-[5px]",
                tabList:
                  "!bg-neutral-950 rounded !border-neutral-800 p-1 gap-0 border-[1px] h-[32px] items-center",
                tabContent: "text-sm font-semibold text-slate-300 p-1",
              }}
            />
          </div>
          <div className="flex-end flex items-end">
            <span
              className="border-b-1 border-dotted border-gray-500 !bg-clip-text text-[13px] font-bold text-indigo-400 text-transparent"
              style={{
                background:
                  "linear-gradient(106deg,#8A9CFF 0%,#FF98FA 50%, #FFAB91 95%)",
              }}
            >
              Your Est. Rewards
            </span>
          </div>
        </div>
      </div>
      {selectedTabKey === "simple" ? (
        <div className="rounded-md border-1 border-[#221F31] bg-[#15151d96] px-6">
          <SimpleInfo data={simpleInfo} />
        </div>
      ) : (
        <div className="rounded-md border-1 border-[#221F31] bg-[#15151d96] p-6 pt-0">
          <DetailedInfo data={detailedInfo} />
        </div>
      )}
    </div>
  );
}
