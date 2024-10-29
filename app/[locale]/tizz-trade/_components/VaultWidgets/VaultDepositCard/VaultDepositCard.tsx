"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Divider } from "@nextui-org/react";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import BaseButton from "@/components/buttons/BaseButton/BaseButton";
import InfoIcon from "@/components/icons/InfoIcon";
import { CollateralTypes } from "@/utils/tizz";

import DepositContent from "./DepositContent";
import WithdrawContent from "./WithdrawContent";
import { twMerge } from "tailwind-merge";

type VaultDepositCardProps = {
  collateralType: CollateralTypes;
};

export default function VaultDepositCard({
  collateralType,
}: VaultDepositCardProps) {
  const t = useTranslations("Trade-VaultDepositCard");

  const [mode, setMode] = useState<"deposit" | "withdraw">("deposit");

  return (
    <BaseCard
      classNames={{ base: "p-6 bg-neutral-900 gap-[60px] md:flex-row" }}
    >
      <div className="flex w-full flex-col gap-3 md:w-1/2">
        <div className="flex flex-col gap-3.5">
          <h6 className="text-2xl font-semibold text-white">
            {mode === "deposit" ? t("deposit") : t("withdraw")}
          </h6>
          <div className="flex gap-1">
            <BaseButton
              onClick={() => setMode("deposit")}
              className={twMerge(
                "h-9 rounded border border-gray-800  bg-neutral-800 px-4 py-2.5 text-sm text-gray-400",
                mode === "deposit" && "bg-amber-300 text-black",
              )}
            >
              {t("deposit")}
            </BaseButton>
            <BaseButton
              onClick={() => setMode("withdraw")}
              className={twMerge(
                "h-9 rounded border border-gray-800  bg-neutral-800 px-4 py-2.5 text-sm text-gray-400",
                mode === "withdraw" && "bg-amber-300 text-black",
              )}
            >
              {t("withdraw")}
            </BaseButton>
          </div>
        </div>
        <Divider />

        <p className="text-sm leading-tight text-gray-400">
          {mode === "deposit"
            ? t("deposit-description", { collateralType })
            : t("withdraw-description")}
        </p>
        <div></div>
        <div className="inline-flex items-start justify-start gap-2 rounded-lg border border-yellow-800 px-2 py-3.5">
          <InfoIcon fill="#5B5B6C" className="relative h-6 w-6" />

          <p className="shrink grow basis-0 text-xs font-normal leading-[18px] text-gray-600">
            {t("deposit-notify")}
          </p>
        </div>
      </div>
      {mode === "deposit" ? (
        <DepositContent collateralType={collateralType} />
      ) : (
        <WithdrawContent collateralType={collateralType} />
      )}
    </BaseCard>
  );
}
