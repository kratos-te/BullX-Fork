"use client";

import { useTranslations } from "next-intl";

import { CollateralTypes } from "@/utils/tizz";

import { VaultLink } from "@/tizz-trade-components/VaultWidgets/VaultLink/VaultLink";

export default function Page() {
  const t = useTranslations("Trade-VaultPage");

  return (
    <div className="mx-auto h-full w-full md:w-[700px]">
      <h6 className="mb-6 text-stone-200">{t("vaults")}</h6>

      <div className="flex w-full flex-col gap-6">
        {Object.values(CollateralTypes).map((collateralType) => (
          <VaultLink key={collateralType} collateralType={collateralType} />
        ))}
      </div>
    </div>
  );
}
