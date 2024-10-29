"use client";

import { memo, useCallback, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import ReactLoading from "react-loading";
import { Button, Tooltip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useSnackbar } from "notistack";
import { Address, maxInt256 } from "viem";
import { useAccount } from "wagmi";
import { CollateralConfig, Pair, Fee, PositionType } from "@gainsnetwork/sdk";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { twMerge } from "tailwind-merge";
import { tizzContractAddresses, CollateralTypes } from "@/utils/tizz";

import { TradeOrderType } from "@/types/index";

import BaseButton from "@/components/buttons/BaseButton/BaseButton";

import OpenTradeModal from "./OpenTradeModal";

import { useApprove } from "@/tizz-trade-hooks/useApprove";

export type TradeOpenButtonProps = {
  collateralType: CollateralTypes;
  collateralConfigPrecision: number;
  collateralAmount: number;
  tradeOpenButtonLabel: string;
  tradeOpenButtonClassName: string;
  disabledBy?: string;
  position: PositionType;
  orderType: TradeOrderType;
  collateralConfig: CollateralConfig;
  leverage: number;
  positionSize: number;
  pair: Pair & { pairId?: number };
  fee: Fee;
  openPrice: number;
  maxSlippage: number;
  stopLoss: number;
  takeProfit: number;
};

export default memo(function TradeOpenButton({
  collateralType,
  collateralConfigPrecision,
  collateralAmount,
  tradeOpenButtonLabel,
  tradeOpenButtonClassName,
  disabledBy,
  position,
  orderType,
  collateralConfig,
  leverage,
  positionSize,
  pair,
  fee,
  openPrice,
  maxSlippage,
  stopLoss,
  takeProfit,
}: TradeOpenButtonProps) {
  const t = useTranslations("Trade-TradeOpenButton");
  const { enqueueSnackbar } = useSnackbar();

  const account = useAccount();

  const {
    allowance,
    isLoading,
    approve,
    waitingForTransactionReceipt: waitingForApproveTransactionReceipt,
  } = useApprove({
    owner: account.address,
    spender: tizzContractAddresses[collateralType].TradingStorage as Address,
    erc20Address: tizzContractAddresses[collateralType].DAI as Address,
    onError() {
      enqueueSnackbar("Failed at Approve", {
        autoHideDuration: 5000,
        variant: "error",
      });
    },
  });

  const {
    isOpen: isTradeModalOpen,
    onOpen: onTradeModalOpen,
    onClose: onTradeModalClose,
    onOpenChange: onTradeModalOpenChange,
  } = useDisclosure();

  const [isOpenConnectorModal, setIsOpenConnectorModal] = useState(false);

  const handleApprove = useCallback(() => {
    approve(maxInt256);
  }, [approve]);

  const approved =
    allowance &&
    allowance >
      BigInt(Math.floor(collateralAmount * collateralConfigPrecision));

  return (
    <>
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
                if (
                  connectModalOpen ||
                  waitingForApproveTransactionReceipt ||
                  isOpenConnectorModal ||
                  isLoading
                ) {
                  return (
                    <BaseButton
                      onClick={openConnectModal}
                      className="h-12 border border-gray-900"
                      fullWidth
                    >
                      <ReactLoading type={"bubbles"} color={"#d1d1d1"} />
                    </BaseButton>
                  );
                }

                if (!connected) {
                  return (
                    <div className="flex flex-col gap-2">
                      <BaseButton
                        onClick={openConnectModal}
                        radius="md"
                        className="h-12 border border-gray-800 bg-neutral-800 text-base text-stone-200"
                        fullWidth
                      >
                        {t("connect-wallet")}
                      </BaseButton>
                      <div className="h-8 w-full rounded-lg border border-red-400 px-3 py-2 text-center text-xs font-medium leading-[14px] text-red-400 shadow">
                        {t("wallet-not-connected")}
                      </div>
                    </div>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      {t("wrong-network")}
                    </button>
                  );
                }

                if (!approved) {
                  return (
                    <BaseButton
                      onClick={handleApprove}
                      radius="md"
                      className="h-12 bg-amber-300 text-base text-black"
                      fullWidth
                    >
                      {t("approve")}
                    </BaseButton>
                  );
                }

                return (
                  <Tooltip
                    placement="top"
                    radius="sm"
                    content={disabledBy || ""}
                    delay={1000}
                    offset={10}
                    color="danger"
                    classNames={{
                      base: "max-w-[300px]",
                    }}
                    isDisabled={!disabledBy}
                  >
                    <Button
                      onClick={onTradeModalOpen}
                      radius="md"
                      className={twMerge(
                        "h-12 text-base font-bold text-black",
                        tradeOpenButtonClassName,
                        !!disabledBy && "bg-neutral-800 text-gray-400/80",
                      )}
                      disabled={!!disabledBy}
                      fullWidth
                    >
                      {tradeOpenButtonLabel}
                    </Button>
                  </Tooltip>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      <OpenTradeModal
        position={position}
        orderType={orderType}
        collateralType={collateralType}
        collateralAmount={+collateralAmount}
        collateralConfig={collateralConfig}
        leverage={leverage}
        positionSize={positionSize}
        pair={pair}
        fee={fee}
        openPrice={openPrice}
        maxSlippage={maxSlippage}
        stopLoss={+stopLoss}
        takeProfit={+takeProfit}
        isOpen={isTradeModalOpen}
        onClose={onTradeModalClose}
        onOpenChange={onTradeModalOpenChange}
        onConnectorModalOpenChange={setIsOpenConnectorModal}
      />
    </>
  );
});
