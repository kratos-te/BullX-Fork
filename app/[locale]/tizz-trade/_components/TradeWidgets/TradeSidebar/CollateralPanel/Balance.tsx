"use client";

import { useTranslations } from "next-intl";

import BalanceIcon from "@/components/icons/BalanceIcon";
import { getPriceStr } from "@/utils/price";

export type BalanceProps = {
  balance: number;
  unit: string;
};

export default function Balance({ balance, unit }: BalanceProps) {
  const t = useTranslations("Trade-CollateralBalance");

  return (
    <div className="flex gap-1">
      <BalanceIcon />
      <div className="text-xs text-gray-400">
        {t("balance")}: {`${getPriceStr(balance)} ${unit}`}
      </div>
    </div>
  );
}
