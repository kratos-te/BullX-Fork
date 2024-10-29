"use client";

import TokenIcon from "@/components/icons/TokenIcon";
import TabButtonGroup from "@/components/buttons/TabButtonGroup/TabButtonGroup";

const Buttons = [
  {
    name: "Dashboard",
    icon: <TokenIcon token="dai" width={18} height={18} />,
    url: "/tizz-trade/portfolio/dashboard",
    isImplemented: true,
  },
  {
    name: "History",
    icon: <TokenIcon token="dai" width={18} height={18} />,
    url: "/tizz-trade/portfolio/history",
    isImplemented: false,
  },
  {
    name: "Rewards",
    icon: <TokenIcon token="dai" width={18} height={18} />,
    url: "/tizz-trade/portfolio/rewards",
    isImplemented: true,
  },
];

export default function PortfolioSidebar() {
  return (
    <div className="flex h-full w-full flex-col p-[16px]">
      <TabButtonGroup buttons={Buttons} />
    </div>
  );
}
