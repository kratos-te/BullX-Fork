"use client";

import { useTranslations } from "next-intl";

import SettingIcon from "@/components/icons/SettingIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import BaseSwitch from "@/components/switchs/BaseSwitch/BaseSwitch";
import BaseSelector from "@/components/selects/BaseSelector/BaseSelector";

export type TradeControlBarProps = {
  tradeMode: "team" | "user";
  onChangeTradeMode(mode: "team" | "user"): void;
};

export default function TradeControlBar({
  tradeMode,
  onChangeTradeMode,
}: TradeControlBarProps) {
  const t = useTranslations("Trade-TradeControlBar");

  const handleChangeSelection = (val: boolean) => {
    if (val === true) {
      onChangeTradeMode("team");
    } else onChangeTradeMode("user");
  };

  const items = [
    {
      id: "all",
      label: t("all"),
    },
  ];

  return (
    <div className="flex w-fit items-center justify-between gap-2 md:gap-[38px]">
      <BaseSwitch
        label={
          tradeMode === "user"
            ? t("switch-to-team-stats")
            : t("switch-to-team-stats")
        }
        isSelected={tradeMode === "team"}
        setIsSelected={handleChangeSelection}
        classNames={{
          wrapper: "hidden",
          label: "text-gray-400 font-semibold",
        }}
      />

      <BaseSelector
        classNames={{
          base: "w-[58px] bg-none border-none",
          value: "pl-2 justify-center text-sm font-semibold text-gray-400",
          selectorIcon: "text-gray-400",
          trigger: "p-0 border-none bg-transparent",
          popoverContent: "w-fit",
        }}
        items={items}
      />

      <SettingIcon
        width={24}
        height={24}
        fill="#9494A8"
        className="cursor-pointer"
      />

      <DownloadIcon
        width={24}
        height={24}
        fill="#9494A8"
        className="cursor-pointer"
      />
    </div>
  );
}
