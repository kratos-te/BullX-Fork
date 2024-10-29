"use client";

import { ChangeEventHandler, useState, useMemo } from "react";
import { useTranslations, useFormatter } from "next-intl";
import { useSnackbar } from "notistack";
import { Address } from "viem";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import { TTokenAbi } from "@/abis/Tizz/TToken";
import {
  Divider,
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableColumn,
  Button,
} from "@nextui-org/react";
import dayjs from "dayjs";

import { useTokenBalance } from "@/tizz-trade-hooks/useTokenBalance";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import BaseButton from "@/components/buttons/BaseButton/BaseButton";
import TokenIcon from "@/components/icons/TokenIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import { CollateralTypes, tizzContractAddresses } from "@/utils/tizz";
import FlatInput from "@/components/inputs/FlatInput/FlatInput";
import {
  useVaultsVariables,
  PRECISION,
  EPOCH_PERIOD,
} from "@/tizz-trade-hooks/useVaultVariables";
import { twMerge } from "tailwind-merge";

type WithdrawRequestContentProps = {
  collateralType: CollateralTypes;
};

export default function WithdrawRequestContent({
  collateralType,
}: WithdrawRequestContentProps) {
  const t = useTranslations("Trade-VaultDepositCard");
  const format = useFormatter();
  const { enqueueSnackbar } = useSnackbar();

  const [amount, setAmount] = useState<string>("0");

  const account = useAccount();
  const { writeContract } = useWriteContract();

  const { balance: shareBalance, precision: sharePrecision } = useTokenBalance({
    contractAddress: tizzContractAddresses[collateralType].tDAI as Address,
    ownerAddress: account.address,
  });

  const {
    shareToAssetsPrice,
    currentEpoch,
    currentEpochStart,
    withdrawRequests,
  } = useVaultsVariables(collateralType);

  const requestRows = useMemo(() => {
    if (
      !withdrawRequests ||
      currentEpoch === undefined ||
      currentEpochStart === undefined
    ) {
      return [];
    }

    return withdrawRequests
      .map((epochRequest, index) => {
        if (epochRequest?.status === "success" && epochRequest.result) {
          return {
            id: index,
            data: {
              amount: Number(epochRequest.result) / sharePrecision,
              epoch: Number(currentEpoch) + index + 1,
              withdraw: new Date(
                Number(currentEpochStart) * 1000 + (index + 1) * EPOCH_PERIOD,
              ),
            },
          };
        } else {
          return null;
        }
      })
      .filter(
        (
          row,
        ): row is {
          id: number;
          data: {
            amount: number;
            epoch: number;
            withdraw: Date;
          };
        } => !!row,
      );
  }, [currentEpoch, currentEpochStart, sharePrecision, withdrawRequests]);

  const maxShare =
    shareBalance !== undefined && sharePrecision !== undefined
      ? Number(shareBalance) / sharePrecision
      : 0;
  const maxAssetsRequestPreview = shareToAssetsPrice
    ? maxShare * (Number(shareToAssetsPrice) / PRECISION)
    : 0;
  const assetsRequestPreview = shareToAssetsPrice
    ? Number(amount) * (Number(shareToAssetsPrice) / PRECISION)
    : 0;

  const handleSetMaxRequest = () => {
    setAmount(`${maxShare}`);
  };

  const handleChangeAmount: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.currentTarget.value;

    if (maxShare < +newValue) {
      setAmount(`${maxShare}`);
    } else {
      setAmount(e.currentTarget.value);
    }
  };

  const handleWithdrawRequest = () => {
    if (+amount === 0 || !account.address) {
      return;
    }

    writeContract(
      {
        abi: TTokenAbi,
        address: tizzContractAddresses[collateralType].tDAI as Address,
        functionName: "makeWithdrawRequest",
        args: [BigInt(Math.floor(+amount * sharePrecision)), account.address],
      },
      {
        onError: (err) => {
          console.log("Failed at makeWithdrawRequest: ", Object.entries(err));

          enqueueSnackbar("Failed at WithdrawRequest", {
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

  const handleCancelWithdrawRequest = (amount: number, epoch: number) => {
    if (!account.address) {
      return;
    }

    writeContract(
      {
        abi: TTokenAbi,
        address: tizzContractAddresses[collateralType].tDAI as Address,
        functionName: "cancelWithdrawRequest",
        args: [
          BigInt(Math.floor(amount * sharePrecision)),
          account.address,
          BigInt(epoch),
        ],
      },
      {
        onError: (err) => {
          console.log("Failed at cancelWithdrawRequest: ", Object.entries(err));

          enqueueSnackbar("Failed at Cancel Withdraw Request", {
            autoHideDuration: 5000,
            variant: "error",
          });
        },
      },
    );
  };

  const tokenInfo = `1 tz${collateralType} = ${shareToAssetsPrice ? `${Number(shareToAssetsPrice) / PRECISION} ${collateralType}` : "---"}`;

  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex flex-col gap-2">
        <BaseCard
          classNames={{
            base: "py-2.5 px-3.5 gap-1 bg-neutral-800 border border-gray-800",
          }}
        >
          <p className="text-sm leading-tight text-gray-400">
            {t("withdraw-request")}
          </p>
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
                base: "py-1 px-3.5 gap-1 bg-neutral-800 border border-gray-800 flex-row min-w-[100px] items-center",
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

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400">{format.number(maxShare)}</p>
            <BaseButton
              radius="md"
              className="font-xs min-w-0 rounded-md border border-zinc-700 bg-gray-800 px-1 py-1 text-xs"
              onClick={handleSetMaxRequest}
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
              {format.number(assetsRequestPreview)}
            </div>
            <BaseCard
              classNames={{
                base: "py-1 px-3.5 gap-1 bg-neutral-800 border border-gray-800 flex-row min-w-[100px] items-center",
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
        </BaseCard>
      </div>

      <p className="w-full rounded-lg border border-gray-800 px-2 py-2 text-xs leading-[18px] text-gray-400">
        {tokenInfo}
      </p>

      <Button
        onClick={handleWithdrawRequest}
        disabled={+amount === 0}
        radius="md"
        className={twMerge(
          "h-9 px-4 py-2.5 text-base text-black",
          +amount === 0 ? "bg-neutral-800" : "bg-amber-300",
        )}
        fullWidth
      >
        {t("request")}
      </Button>

      <Divider />

      <p className="text-sm text-stone-200">
        Existing requests: {requestRows.length}
      </p>

      {requestRows.length > 0 ? (
        <Table removeWrapper aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Epoch</TableColumn>
            <TableColumn>Withdraw</TableColumn>
            <TableColumn>Cancel</TableColumn>
          </TableHeader>
          <TableBody>
            {requestRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <div className="flex flex-row items-center gap-1">
                    {row.data.amount}
                    <TokenIcon
                      token={
                        collateralType === CollateralTypes.WBTC
                          ? "btc"
                          : collateralType.toLowerCase()
                      }
                      width={16}
                      height={16}
                    />
                  </div>
                </TableCell>
                <TableCell>{row.data.epoch}</TableCell>
                <TableCell>
                  {dayjs(row.data.withdraw).format("MM/DD/YYYY h:m:s A")}
                </TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    onClick={() =>
                      handleCancelWithdrawRequest(
                        row.data.amount,
                        row.data.epoch,
                      )
                    }
                  >
                    <CloseIcon width={16} height={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
