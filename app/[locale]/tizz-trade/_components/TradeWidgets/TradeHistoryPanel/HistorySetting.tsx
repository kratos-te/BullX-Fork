import { useTranslations } from "next-intl";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@nextui-org/react";

import SettingIcon2 from "@/components/icons/SettingIcon2";
import {
  useTradeState,
  TradeHistorySettings,
} from "@/tizz-trade-hooks/useTradeState";

export default function HistorySetting() {
  const t = useTranslations("Trade-HistorySetting");

  const { tradeState, changeTradeState } = useTradeState();

  const handleChangeSelection = (keys: Selection) => {
    const tradeHistorySettings: TradeHistorySettings = {
      showCloses: false,
      showAllPairs: false,
      usdPositionSize: false,
      compact: false,
    };

    if (keys === "all") {
      tradeHistorySettings.showAllPairs = true;
      tradeHistorySettings.showAllPairs = true;
      tradeHistorySettings.usdPositionSize = true;
      tradeHistorySettings.compact = true;
    } else {
      for (const key of keys) {
        tradeHistorySettings[key as keyof TradeHistorySettings] = true;
      }
    }

    changeTradeState({
      ...tradeState,
      tradeHistorySettings,
    });
  };

  const items = [
    {
      id: "showCloses",
      value: tradeState.tradeHistorySettings.showCloses,
      label: t("show-closes"),
    },
    {
      id: "showAllPairs",
      value: tradeState.tradeHistorySettings.showAllPairs,
      label: t("show-all-pairs"),
    },
    {
      id: "usdPositionSize",
      value: tradeState.tradeHistorySettings.usdPositionSize,
      label: t("usd-position-size"),
    },
    {
      id: "compact",
      value: tradeState.tradeHistorySettings.compact,
      label: t("compact"),
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <SettingIcon2
            viewBox="0 0 16 16"
            className="text-slate-300"
            size={16}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="history-settings-actions"
        closeOnSelect={false}
        selectionMode="multiple"
        selectedKeys={items
          .filter((item) => item.value)
          .map((item) => item.id)
          .reduce((acc: string[], item) => [...acc, item], [])}
        onSelectionChange={handleChangeSelection}
      >
        {items.map((item) => (
          <DropdownItem key={item.id}>{item.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
