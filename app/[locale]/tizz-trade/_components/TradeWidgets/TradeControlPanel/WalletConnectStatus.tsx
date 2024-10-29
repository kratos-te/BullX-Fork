"use client";

import { useTranslations } from "next-intl";

import SmallWalletConnectButton from "@/tizz-trade-components/WalletConnectButtons/SmallWalletConnectButton";

import { twMerge } from "tailwind-merge";

export default function WalletConnectStatus() {
  const t = useTranslations("Trade-WalletConnectStatus");

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-3.5">
      <div className="text-lg font-semibold text-gray-400">
        {t("wallet-not-connected")}
      </div>
      <SmallWalletConnectButton
        className={twMerge(
          "h-[30px] w-[112px] text-xs",
          "rounded-lg border border-slate-300",
          "!bg-transparent from-transparent to-transparent",
        )}
      />
    </div>
  );
}
