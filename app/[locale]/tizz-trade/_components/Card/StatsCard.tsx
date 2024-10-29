"use client";

import { useTranslations } from "next-intl";
import EarnInfo, { EarnInfoItem } from "@/tizz-trade-components/Card/EarnInfo";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import TokenIcon from "@/components/icons/TokenIcon";

export default function StatsCard() {
  const t = useTranslations("Trade-StatsCard");

  const items: EarnInfoItem[] = [
    {
      label: t("available"),
      value: 0,
      icon: <TokenIcon token="btc" width={18} height={18} />,
    },
    {
      label: t("locked"),
      value: 0,
      icon: <TokenIcon token="btc" width={18} height={18} />,
    },
    {
      label: t("total-value"),
      value: 0,
      icon: <TokenIcon token="btc" width={18} height={18} />,
    },
    {
      label: t("est-earnings"),
      value: 0,
      icon: <TokenIcon token="btc" width={18} height={18} />,
    },
  ];

  return (
    <BaseCard classNames={{ base: "p-6 bg-neutral-900" }}>
      <div className="inline-flex h-8 w-[917px] items-center justify-start gap-3.5">
        <div className="text-2xl font-semibold leading-loose text-white">
          {t("your-stats")}
        </div>
      </div>
      <div className="my-8 h-[1px] w-full bg-gray-800"></div>
      <div className="grid grid-flow-col">
        {items.map((item, index) => (
          <EarnInfo key={index} item={item} />
        ))}
      </div>
    </BaseCard>
  );
}
