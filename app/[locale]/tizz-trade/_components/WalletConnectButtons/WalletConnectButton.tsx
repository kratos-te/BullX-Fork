"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReactLoading from "react-loading";
import { useTranslations } from "next-intl";
import { ConnectButton, useChainModal } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useSignMessage,
  useDisconnect,
  useChains,
  useChainId,
} from "wagmi";
import { useSnackbar } from "notistack";

import BaseButton from "@/components/buttons/BaseButton/BaseButton";

import powerSrc from "@/assets/icons/power.svg";

import ArrowDownIcon from "@/components/icons/arrow/ArrowDownIcon";
import HexWarningIcon from "@/components/icons/content/HexWarningIcon";

import { useUserJWT } from "@/tizz-trade-hooks/guild/useUserJWT";

const env = process.env.NEXT_PUBLIC_ENV;

const uris = {
  botanix: "https://tizz.netlify.app",
  sepolia: "https://tizz-sepolia.netlify.app",
};

export default function WalletConnectButton() {
  const t = useTranslations("Trade-WallectConnectButton");
  const { enqueueSnackbar } = useSnackbar();

  const { userJwtQuery, signin, signout } = useUserJWT();

  const account = useAccount();
  const chainId = useChainId();

  const { signMessage } = useSignMessage();
  const { disconnect } = useDisconnect();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (
      chainId &&
      isConnected &&
      account.address &&
      userJwtQuery.isFetched &&
      (!userJwtQuery.data ||
        userJwtQuery.data.wallet_address !== account.address ||
        userJwtQuery.data.expirationTime < Date.now())
    ) {
      const timestamp = Date.now();

      signMessage(
        {
          message: [
            "Welcome to tizz!",
            ...[
              { key: "URI", value: uris[env as keyof typeof uris] },
              { key: "Version", value: 1 },
              { key: "Chain ID", value: chainId },
              { key: "Issued At", value: new Date(timestamp).toISOString() },
              {
                key: "Expires At",
                value: new Date(timestamp + 24 * 3600 * 1000).toISOString(),
              },
            ].map((item) => `${item.key}: ${item.value}`),
          ].join("\n\n"),
        },
        {
          onSuccess: (data) => {
            signin({
              wallet_address: account.address!,
              signature: data,
              timestamp,
            });
          },
          onError: () => {
            enqueueSnackbar("Failed at Sign Message", {
              autoHideDuration: 5000,
              variant: "error",
            });
            disconnect();
          },
        },
      );
    }
  }, [
    account.status,
    account.address,
    signMessage,
    userJwtQuery.data,
    userJwtQuery.isFetched,
    enqueueSnackbar,
    disconnect,
    isConnected,
    signin,
    chainId,
  ]);

  useEffect(() => {
    if (!isConnected && account.status === "connected") {
      setIsConnected(true);
    }
  }, [account.status, isConnected]);

  useEffect(() => {
    if (
      isConnected &&
      account.status === "disconnected" &&
      userJwtQuery.data &&
      userJwtQuery.isFetched
    ) {
      signout();
    }
  }, [
    account,
    userJwtQuery.data,
    userJwtQuery.isFetched,
    signout,
    isConnected,
  ]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
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
                    className="flex h-10 w-[145px] flex-col items-center justify-center rounded border border-gray-900 bg-gray-700 px-[17px] py-0.5"
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
                    className="w-fit border border-yellow-800 bg-amber-300 p-2.5 text-black"
                  >
                    {t("connect-wallet")}
                    <Image
                      src={powerSrc}
                      alt="Power"
                      width={20}
                      height={20}
                      className="hidden md:block"
                    />
                  </BaseButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <BaseButton
                    onClick={openChainModal}
                    className="hidden min-w-0 items-center gap-1 border border-red-600 bg-neutral-800 p-1 text-sm text-red-600 md:flex md:p-2.5"
                  >
                    <HexWarningIcon size={20} className="text-red-600" />
                    {chain.iconUrl ? (
                      <Image
                        src={chain.iconUrl}
                        alt="Chain Icon"
                        height={20}
                        width={20}
                      />
                    ) : null}
                    <span className="hidden md:inline">
                      {t("wrong-network")}
                    </span>
                    <ArrowDownIcon size={20} className="text-red-600" />
                  </BaseButton>
                );
              }

              return (
                <div className="flex items-center gap-3 md:gap-5">
                  <BaseButton
                    onClick={openChainModal}
                    className="min-w-0 items-center gap-1 border border-gray-800 bg-neutral-800 p-1 text-sm text-gray-400 md:p-2.5"
                  >
                    {chain.iconUrl ? (
                      <Image
                        src={chain.iconUrl}
                        alt="Chain Icon"
                        height={20}
                        width={20}
                      />
                    ) : null}
                    <span className="hidden md:inline">
                      {chain.name ? chain.name : ""}
                    </span>
                    <ArrowDownIcon size={20} className="text-gray-400" />
                  </BaseButton>

                  <BaseButton
                    onClick={openAccountModal}
                    className="hidden min-w-0 items-center gap-1 border border-gray-800 bg-neutral-800 p-1 text-sm text-amber-300 md:flex md:p-2.5"
                  >
                    {chain.iconUrl ? (
                      <Image
                        src={chain.iconUrl}
                        alt="Chain Icon"
                        height={20}
                        width={20}
                      />
                    ) : null}
                    <span className="hidden md:inline">
                      {account.address.substring(0, 7)}
                    </span>
                    <ArrowDownIcon size={20} className="text-gray-400" />
                  </BaseButton>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
