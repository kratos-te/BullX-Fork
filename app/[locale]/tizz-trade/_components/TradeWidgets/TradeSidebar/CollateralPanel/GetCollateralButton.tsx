"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { useAccount, useWriteContract, useConfig } from "wagmi";
import {
  waitForTransactionReceipt,
  WaitForTransactionReceiptErrorType,
} from "@wagmi/core";
import ReactLoading from "react-loading";
import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";

import Button from "@/components/buttons/Button/Button";

import {
  CollateralTypes,
  testNetChainIds,
  tizzContractAddresses,
} from "@/utils/tizz";
import { MockTokenAbi } from "@/abis/Tizz/MockToken";
import { Address } from "viem";
import { getPriceStr } from "@/utils/price";

export const collateralLabel: Record<string, string> = {
  [CollateralTypes.USDT]: "USDT",
  [CollateralTypes.WBTC]: "WBTC",
};

const mockMintUsdPrice = 10000;

export type GetCollateralButtonProps = {
  chainId: number;
  collateralType: CollateralTypes;
  collateralPrecision?: number;
  collateralPriceUsd?: number;
};

export default function GetCollateralButton({
  chainId,
  collateralType,
  collateralPrecision,
  collateralPriceUsd,
}: GetCollateralButtonProps) {
  const t = useTranslations("Trade-GetCollateralButton");
  const { enqueueSnackbar } = useSnackbar();

  const account = useAccount();
  const config = useConfig();
  const { writeContract } = useWriteContract();

  const [waitingForTransactionReceipt, setWaitingForTransactionReceipt] =
    useState(false);

  const mintAmount = +getPriceStr(
    mockMintUsdPrice / (collateralPriceUsd || 1),
  ).replace(",", "");

  const handleClickGetFreeDaiButton = async () => {
    if (account.address && collateralPrecision) {
      setWaitingForTransactionReceipt(true);

      writeContract(
        {
          abi: MockTokenAbi,
          address: tizzContractAddresses[collateralType].DAI as Address,
          functionName: "mint",
          args: [
            account.address,
            BigInt(Math.floor(mintAmount * (collateralPrecision || 0))),
          ],
        },
        {
          onSuccess: async (hash) => {
            try {
              await waitForTransactionReceipt(config, {
                hash,
              });
            } catch (err) {
              console.log(
                Object.entries(err as WaitForTransactionReceiptErrorType),
              );
              enqueueSnackbar("Failed at Minting Test Collateral", {
                autoHideDuration: 5000,
                variant: "error",
              });
            }

            setWaitingForTransactionReceipt(false);
          },
          onError: (err) => {
            setWaitingForTransactionReceipt(false);

            console.log(
              "Failed at Minting Test Collateral: ",
              Object.entries(err),
            );

            enqueueSnackbar("Failed at Minting Test Collateral", {
              autoHideDuration: 5000,
              variant: "error",
            });
          },
        },
      );
    }
  };

  if (!testNetChainIds.includes(chainId)) {
    return (
      <Link href="/tizz-trade/buy-crypto">
        <Button className="border-stroke bg-neutral-800 px-2 text-xs text-gray-400">
          {t("get-collateral")}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      onClick={handleClickGetFreeDaiButton}
      className="h-8 min-w-[130px] bg-neutral-800"
    >
      {waitingForTransactionReceipt ? (
        <ReactLoading type={"bubbles"} color={"#d1d1d1"} />
      ) : (
        `${t("get")} ${mintAmount} ${collateralLabel[collateralType]}`
      )}
    </Button>
  );
}
