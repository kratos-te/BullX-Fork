"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import BaseButton from "@/components/buttons/BaseButton/BaseButton";
import { CollateralTypes } from "@/utils/tizz";

import RedeemContent from "./RedeemContent";
import WithdrawRequestContent from "./WithdrawRequestContent";

type WithdrawContentProps = {
  collateralType: CollateralTypes;
};

export default function WithdrawContent({
  collateralType,
}: WithdrawContentProps) {
  const t = useTranslations("Trade-VaultDepositCard");

  const [mode, setMode] = useState<"request" | "redeem">("redeem");

  return (
    <div className="flex w-full flex-col gap-3.5 md:w-1/2">
      <div className="flex gap-1">
        <BaseButton
          onClick={() => setMode("redeem")}
          className={twMerge(
            "h-9 rounded border border-gray-800  bg-neutral-800 px-4 py-2.5 text-sm text-gray-400",
            mode === "redeem" && "bg-amber-300 text-black",
          )}
        >
          {t("redeem")}
        </BaseButton>
        <BaseButton
          onClick={() => setMode("request")}
          className={twMerge(
            "h-9 rounded border border-gray-800  bg-neutral-800 px-4 py-2.5 text-sm text-gray-400",
            mode === "request" && "bg-amber-300 text-black",
          )}
        >
          {t("withdraw-request")}
        </BaseButton>
      </div>

      {mode === "redeem" ? (
        <RedeemContent collateralType={collateralType} />
      ) : (
        <WithdrawRequestContent collateralType={collateralType} />
      )}
    </div>
  );
}
