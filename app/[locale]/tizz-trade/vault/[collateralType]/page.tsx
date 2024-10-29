"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

import { CollateralTypes } from "@/utils/tizz";

import VaultMainCard from "@/tizz-trade-components/VaultWidgets/VaultMainCard/VaultMainCard";
import VaultStatsCard from "@/tizz-trade-components/VaultWidgets/VaultStatsCard/VaultStatsCard";
import VaultDepositCard from "@/tizz-trade-components/VaultWidgets/VaultDepositCard/VaultDepositCard";
import ArrowIcon from "@/components/icons/ArrowIcon";

export default function Page({
  params,
}: {
  params: { collateralType: CollateralTypes };
}) {
  const t = useTranslations("Trade-VaultPage");

  return (
    <div className="h-full w-full">
      <Link
        href={`/tizz-trade/vault`}
        className="mb-6 flex items-center gap-3 text-sm font-normal leading-none text-gray-400"
      >
        <ArrowIcon />
        {t("vaults")} / {`tz${params.collateralType}`}
      </Link>

      <div className="flex w-full flex-col gap-6 md:flex-row">
        <div className="w-full md:w-[429px] md:grow-0">
          <VaultMainCard collateralType={params.collateralType} />
        </div>

        <div className="flex w-full flex-1 flex-col gap-6 md:grow">
          <VaultStatsCard collateralType={params.collateralType} />
          <VaultDepositCard collateralType={params.collateralType} />
        </div>
      </div>
    </div>
  );
}
