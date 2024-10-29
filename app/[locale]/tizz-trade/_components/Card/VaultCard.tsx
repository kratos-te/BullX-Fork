"use client";

import { useTranslations } from "next-intl";

import BaseBadge from "@/components/badges/baseBadge/BaseBadge";
import BaseCard from "@/components/cards/BaseCard/BaseCard";
import EarnInfo, { EarnInfoItem } from "@/tizz-trade-components/Card/EarnInfo";

import TokenIcon from "@/components/icons/TokenIcon";

export default function VaultCard() {
  const t = useTranslations("Trade-VaultCard");

  const items: EarnInfoItem[] = [
    {
      label: "TVL",
      value: 32467930,
      icon: <TokenIcon token="dai" width={18} height={18} />,
    },
    {
      label: t("collat-ratio"),
      value: "112.63%",
    },
    {
      label: `tBTC ${t("price")}`,
      value: "1.14375",
      icon: <TokenIcon token="dai" width={18} height={18} />,
    },
    {
      label: `tBTC ${t("supply")}`,
      value: "28387168",
      icon: <TokenIcon token="dai" width={18} height={18} />,
    },
  ];

  return (
    <BaseCard classNames={{ base: "p-6 bg-neutral-900" }}>
      <div>
        <div className="flex flex-col items-start justify-start gap-8 self-stretch border-b border-b-gray-800">
          <div className="inline-flex items-center justify-start gap-3.5 self-stretch pb-4">
            <div className="text-5xl font-semibold leading-[60px] text-white">
              gDAI {t("vault")}
            </div>
            <BaseBadge value={"12.7"} />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-b border-b-gray-800 py-8">
          <div className="inline-flex h-8 items-center justify-start gap-2">
            <div className="text-2xl font-semibold leading-loose text-white">
              {t("epoch")} 140
            </div>
            <div className="flex items-center justify-start gap-1">
              <div className="flex h-4 w-4 items-center justify-center">
                <div className="relative h-4 w-4"></div>
              </div>
              <div className="text-sm font-normal leading-tight text-emerald-400">
                {t("remaining")}: 1d 0h 52m
              </div>
            </div>
          </div>
          <div className="inline-flex h-5 w-[398px] items-center justify-start gap-[17px]">
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5">
              <div className="inline-flex items-center justify-start gap-[17px]">
                <div className="text-sm font-normal leading-tight text-orange-300">
                  {t("start")}: 2/19/24, 7:32 PM
                </div>
              </div>
            </div>
            <div className="h-full w-[1px] self-stretch bg-gray-800"></div>
            <div className="shrink grow basis-0 text-right text-sm font-normal leading-tight text-orange-300">
              {t("end")}: 2/22/24, 7:32 PM
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-6 py-8">
          {items.map((item, index) => (
            <EarnInfo key={index} item={item} />
          ))}
        </div>

        <div className="inline-flex h-[84px] w-full items-start justify-start gap-2.5 rounded-lg border border-orange-300 bg-gradient-to-r from-orange-400 to-amber-300 p-3.5">
          <div className="shrink grow basis-0 text-lg font-bold leading-7 text-black">
            {t("description")}
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
