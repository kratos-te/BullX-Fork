"use client";

import { ChangeEventHandler, useState } from "react";
import { useTranslations, useFormatter } from "next-intl";
import { useSnackbar } from "notistack";
import { Address } from "viem";
import { useAccount, useWriteContract } from "wagmi";

import { useTokenBalance } from "@/tizz-trade-hooks/useTokenBalance";

import { TTokenAbi } from "@/abis/Tizz/TToken";
import BaseCard from "@/components/cards/BaseCard/BaseCard";
import BaseButton from "@/components/buttons/BaseButton/BaseButton";
import TokenIcon from "@/components/icons/TokenIcon";
import { CollateralTypes, tizzContractAddresses } from "@/utils/tizz";
import FlatInput from "@/components/inputs/FlatInput/FlatInput";
import {
  useVaultsVariables,
  PRECISION,
} from "@/tizz-trade-hooks/useVaultVariables";
import { DepositButton } from "./DepositButton";

type DepositContentProps = {
  collateralType: CollateralTypes;
};

export default function DepositContent({
  collateralType,
}: DepositContentProps) {
  const t = useTranslations("Trade-VaultDepositCard");
  const format = useFormatter();
  const { enqueueSnackbar } = useSnackbar();

  const [amount, setAmount] = useState<string>("0");

  const account = useAccount();
  const { writeContract } = useWriteContract();

  const { balance: assetBalance, precision: assetPrecision } = useTokenBalance({
    contractAddress: tizzContractAddresses[collateralType].DAI as Address,
    ownerAddress: account.address,
  });

  const { shareToAssetsPrice } = useVaultsVariables(collateralType);

  const maxDeposit =
    assetBalance !== undefined && assetPrecision !== undefined
      ? Number(assetBalance) / assetPrecision
      : 0;
  const maxSharePreview = shareToAssetsPrice
    ? maxDeposit / (Number(shareToAssetsPrice) / PRECISION)
    : 0;
  const sharePreview = shareToAssetsPrice
    ? Number(amount) / (Number(shareToAssetsPrice) / PRECISION)
    : 0;

  const handleSetMax = () => {
    setAmount(`${maxDeposit}`);
  };

  const handleChangeAmount: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.currentTarget.value;

    if (maxDeposit < +newValue) {
      setAmount(`${maxDeposit}`);
    } else {
      setAmount(e.currentTarget.value);
    }
  };

  const handleDeposit = () => {
    if (+amount === 0 || !account.address) {
      return;
    }

    writeContract(
      {
        abi: TTokenAbi,
        address: tizzContractAddresses[collateralType].tDAI as Address,
        functionName: "deposit",
        args: [BigInt(Math.floor(+amount * assetPrecision)), account.address],
      },
      {
        onError: (err) => {
          console.log("Failed at Deposit: ", Object.entries(err));

          enqueueSnackbar("Failed at Deposit", {
            autoHideDuration: 5000,
            variant: "error",
          });
        },
        onSuccess: () => {
          setAmount("0");
        },
      },
    );
  };

  const tokenInfo = `1 ${collateralType} = ${shareToAssetsPrice ? `${PRECISION / Number(shareToAssetsPrice)} tz${collateralType}` : "---"}`;

  return (
    <div className="flex w-full flex-col gap-3.5 md:w-1/2">
      <div className="flex flex-col gap-2">
        <BaseCard
          classNames={{
            base: "py-2.5 px-3.5 gap-1 bg-neutral-800 border border-gray-800",
          }}
        >
          <p className="text-sm leading-tight text-gray-400">{t("deposit")}</p>
          <div className="flex justify-between">
            <FlatInput
              inputMode="decimal"
              type="number"
              pattern="^([0-9]+(?:[.,][0-9]*)?)$"
              autoComplete="off"
              value={amount}
              onChange={handleChangeAmount}
            />
            <BaseCard
              classNames={{
                base: "py-1 px-3.5 gap-1 bg-neutral-800 border border-gray-800 flex-row min-w-[100px]",
              }}
            >
              <TokenIcon
                token={
                  collateralType === CollateralTypes.WBTC
                    ? "btc"
                    : collateralType.toLowerCase()
                }
                width={16}
                height={16}
              />
              {collateralType}
            </BaseCard>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400">{format.number(maxDeposit)}</p>
            <BaseButton
              radius="md"
              className="font-xs min-w-0 rounded-md border border-zinc-700 bg-gray-800 px-1 py-1 text-xs"
              onClick={handleSetMax}
            >
              {t("max")}
            </BaseButton>
          </div>
        </BaseCard>

        <BaseCard
          classNames={{
            base: "py-2.5 px-3.5 gap-1 bg-neutral-800 border border-gray-800",
          }}
        >
          <div className="text-sm font-normal leading-tight text-gray-400">
            {t("you-receive")}
          </div>
          <div className="flex justify-between">
            <div className="text-3xl font-semibold text-white">
              {sharePreview}
            </div>
            <BaseCard
              classNames={{
                base: "py-1 px-3.5 gap-1 bg-neutral-800 border border-gray-800 flex-row min-w-[100px]",
              }}
            >
              <TokenIcon
                token={
                  collateralType === CollateralTypes.WBTC
                    ? "btc"
                    : collateralType.toLowerCase()
                }
                width={16}
                height={16}
              />
              tz{collateralType}
            </BaseCard>
          </div>
        </BaseCard>
      </div>

      <p className="w-full rounded-lg border border-gray-800 px-2 py-2 text-xs leading-[18px] text-gray-400">
        {tokenInfo}
      </p>

      <DepositButton
        collateralType={collateralType}
        PRECISION={PRECISION}
        onClick={handleDeposit}
        depositAmount={+amount}
        disabled={+amount === 0}
      />
    </div>
  );
}
