"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import TokenIcon from "@/components/icons/TokenIcon";

import EarnCard, { EarnCardItem } from "@/tizz-trade-components/Card/EarnCard";
import { EarnInfoItem } from "@/tizz-trade-components/Card/EarnInfo";

export default function EarnData() {
  const t = useTranslations("Trade-EarnData");

  const [selected, setSelected] = useState<number | null>(null);

  const items: EarnInfoItem[] = [
    {
      label: t("deposit"),
      value: "BTC",
      icon: <TokenIcon token="btc" width={18} height={18} />,
    },
    {
      label: "TVL",
      value: 32470123,
      icon: <TokenIcon token="btc" width={18} height={18} />,
    },
    {
      label: "tBTC Price",
      value: 1.14379,
      icon: <TokenIcon token="btc" width={18} height={18} />,
    },
  ];

  const earnData: EarnCardItem[] = [
    {
      title: "tBTC",
      percentage: 12.7,
      icon: <TokenIcon token="btc" width={18} height={18} />,
      info: items,
    },
    {
      title: "tDAI",
      percentage: 12.7,
      icon: <TokenIcon token="dai" width={18} height={18} />,
      info: items,
    },
  ];

  return (
    <>
      {earnData.map((data, index) => (
        <EarnCard
          key={index}
          isSelected={index === selected}
          onClick={() => setSelected(index)}
          earnData={data}
        />
      ))}
    </>
  );
}
