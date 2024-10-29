"use client";

import { Button } from "@nextui-org/react";
import ReactLoading from "react-loading";
import { useAccount } from "wagmi";
import { twMerge } from "tailwind-merge";
import { useSnackbar } from "notistack";

import { tizzContractAddresses, CollateralTypes } from "@/utils/tizz";
import { Address, maxInt256 } from "viem";
import { useTranslations } from "next-intl";

import { useApprove } from "@/tizz-trade-hooks/useApprove";
import { useCallback } from "react";

type DepositButtonProps = {
  depositAmount: number;
  PRECISION: number;
  onClick(): void;
  disabled?: boolean;
  waitingForTransactionReceipt?: boolean;
  collateralType: CollateralTypes;
};

export function DepositButton({
  depositAmount,
  PRECISION,
  onClick,
  disabled,
  waitingForTransactionReceipt,
  collateralType,
}: DepositButtonProps) {
  const t = useTranslations("Trade-VaultDepositCard");
  const { enqueueSnackbar } = useSnackbar();

  const account = useAccount();

  const {
    allowance,
    approve,
    waitingForTransactionReceipt: waitingForApproveTransactionReceipt,
  } = useApprove({
    owner: account.address,
    spender: tizzContractAddresses[collateralType].tDAI as Address,
    erc20Address: tizzContractAddresses[collateralType].DAI as Address,
    onError() {
      enqueueSnackbar("Failed at Approve", {
        autoHideDuration: 5000,
        variant: "error",
      });
    },
  });

  const handleApprove = useCallback(() => {
    approve(maxInt256);
  }, [approve]);

  const approved =
    allowance && allowance > BigInt(Math.floor(depositAmount * PRECISION));
  const isDisabled = disabled || allowance === undefined;

  if (waitingForApproveTransactionReceipt || waitingForTransactionReceipt) {
    <Button
      disabled
      radius="md"
      className="h-9 bg-neutral-800 px-4 py-2.5 text-base text-black"
      fullWidth
    >
      <ReactLoading type={"bubbles"} color={"#d1d1d1"} />
    </Button>;
  }

  if (approved) {
    return (
      <Button
        onClick={onClick}
        disabled={isDisabled}
        radius="md"
        className={twMerge(
          "h-9 px-4 py-2.5 text-base text-black",
          isDisabled ? "bg-neutral-800" : "bg-amber-300",
        )}
        fullWidth
      >
        {t("deposit")}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleApprove}
      disabled={isDisabled}
      radius="md"
      className={twMerge(
        "h-9 px-4 py-2.5 text-base text-black",
        isDisabled ? "bg-neutral-800" : "bg-amber-300",
      )}
      fullWidth
    >
      {t("approve")}
    </Button>
  );
}
