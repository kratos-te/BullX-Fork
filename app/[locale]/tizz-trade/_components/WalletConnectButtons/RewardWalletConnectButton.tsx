"use client";

import Image from "next/image";
import ReactLoading from "react-loading";
import { twMerge } from "tailwind-merge";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslations } from "next-intl";

import BaseButton from "@/components/buttons/BaseButton/BaseButton";
import logoSrc from "@/assets/icons/logo.png";

type WalletButton = {
  className?: string;
};

export default function RewardWalletConnectButton({ className }: WalletButton) {
  const t = useTranslations("Trade-RewardWalletConnectButton");

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        connectModalOpen,
        mounted,
      }) => {
        const handleWalletConnect = () => {
          openConnectModal();
        };

        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (connectModalOpen) {
                return (
                  <BaseButton
                    onClick={openConnectModal}
                    className={twMerge(
                      "flex h-12 w-full flex-col items-center justify-center rounded border border-gray-900 bg-gray-700 px-[17px] py-0.5",
                      className,
                    )}
                  >
                    <ReactLoading type={"bubbles"} color={"#d1d1d1"} />
                  </BaseButton>
                );
              }

              if (!connected) {
                return (
                  <BaseButton
                    onClick={() => {
                      handleWalletConnect();
                    }}
                    className={twMerge(
                      "text-md inline-flex h-12 w-full flex-col items-center justify-center rounded border border-indigo-600 bg-gradient-to-br from-indigo-700 to-blue-700 px-[17px] py-0.5",
                      className,
                    )}
                  >
                    {t("connect-wallet")}
                  </BaseButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    {t("wrong-network")}
                  </button>
                );
              }

              return (
                <BaseButton className="text-md flex h-10 w-full items-center justify-center rounded border border-zinc-600 bg-zinc-700 px-[17px] py-0.5 text-center text-zinc-300">
                  {t("claim-all")} - 0.00
                  <div className="flex h-4 w-4 items-center justify-center rounded-2xl border-1 border-emerald-300 pr-[2px] opacity-60">
                    <Image src={logoSrc} alt="Logo" width={8} height={8} />
                  </div>
                </BaseButton>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
