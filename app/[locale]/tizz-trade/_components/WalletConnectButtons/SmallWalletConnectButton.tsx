"use client";

import ReactLoading from "react-loading";
import { useTranslations } from "next-intl";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import BaseButton from "@/components/buttons/BaseButton/BaseButton";
import { twMerge } from "tailwind-merge";

type WalletButton = {
  className?: string;
};

export default function SmallWalletConnectButton({ className }: WalletButton) {
  const t = useTranslations("Trade-SmallWalletConnectButton");

  return (
    <ConnectButton.Custom>
      {({ chain, openChainModal, openConnectModal, connectModalOpen }) => {
        const handleWalletConnect = () => {
          openConnectModal();
        };

        return (
          <div className="w-fit">
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

              if (chain?.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    {t("wrong-network")}
                  </button>
                );
              }

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
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
