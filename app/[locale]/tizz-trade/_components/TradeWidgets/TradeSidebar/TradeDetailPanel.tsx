"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { Tooltip } from "@nextui-org/react";
import { Fee, Pair, PositionType } from "@gainsnetwork/sdk";
import { useTranslations } from "next-intl";
import { Address } from "viem";

import { getPercentageStr, getPriceStr } from "@/utils/price";
import BorderedInput from "@/components/inputs/BorderedInput/BorderedInput";
import { CollateralTypes, tizzContractAddresses } from "@/utils/tizz";

import { TizzFundingFeesAbi } from "@/abis/Tizz/TizzFundingFees";

import { useGetFees } from "@/tizz-trade-hooks/useGetFees";

export type TradeDetailPanelProps = {
  position: PositionType;
  price: number;
  collateralType: CollateralTypes;
  collateralAmount: number;
  collateralPriceUsd: number;
  collateralPrecision: number;
  leverage: number;
  slippage: string;
  pair: Pair;
  fee: Fee;
  onChangeSlippage(value: string): void;
};

export default function TradeDetailPanel({
  position,
  price,
  collateralType,
  collateralAmount,
  collateralPriceUsd,
  collateralPrecision,
  leverage,
  slippage,
  pair,
  fee,
  onChangeSlippage,
}: TradeDetailPanelProps) {
  const t = useTranslations("Trade-TradeDetailPanel");

  const account = useAccount();

  const { predictFee, fundingRate } = useGetFees({
    input: account.address
      ? {
          trader: account.address,
          pairIndex: pair.pairIndex,
          index: 0,
          long: PositionType.LONG === position,
          positionBaseAsset: Math.floor(collateralAmount * collateralPrecision),

          leverage: leverage,
          fee,
        }
      : undefined,
    collateralType,
  });

  const { data: liquidationPriceData } = useReadContract({
    address: tizzContractAddresses[collateralType].FundingFees as Address,
    abi: TizzFundingFeesAbi,
    functionName: "getTradeLiquidationPrice",
    args: account.address
      ? [
          {
            trader: account.address,
            pairIndex: BigInt(pair.pairIndex),
            index: 0n,
            openPrice: BigInt(Math.floor(price * 1e10)),
            long: position === PositionType.LONG,
            collateral: BigInt(
              Math.floor(collateralAmount * collateralPrecision),
            ),
            leverage: BigInt(leverage),
          },
        ]
      : undefined,
  });

  const feeData = predictFee !== undefined ? predictFee : undefined;

  const feeValue =
    feeData !== undefined
      ? `${getPriceStr(feeData / collateralPrecision)} ${collateralType} (${getPercentageStr((Number(feeData) * 100) / collateralPrecision / collateralAmount / leverage)}%)`
      : "-";

  const fundingRateValue =
    fundingRate !== undefined
      ? `${getPercentageStr(Number(fundingRate) / 1e4)}%`
      : "-";

  const liquidationPriceValue =
    liquidationPriceData !== undefined
      ? getPriceStr(Number(liquidationPriceData) / 1e10)
      : "-";

  const handleChangeSlippage = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      /^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value) &&
      !Number.isNaN(e.target.value) &&
      +e.target.value >= 0 &&
      +e.target.value <= 100
    ) {
      onChangeSlippage(e.target.value);
    }
  };

  const items = [
    {
      label: t("est-execution-price"),
      value: getPriceStr(
        price +
          ((position === PositionType.LONG ? 1 : -1) * price) /
            (1 / (pair.spreadP * 0.01) - 1),
      ),
      helperText: t("est-excution-price-description"),
    },
    {
      label: t("avg-spread"),
      value: `${getPriceStr(pair.spreadP / 2)}%`,
      helperText: `You will pay a total of ${getPriceStr(pair.spreadP)}% spread when opening the position but no spread when closing the position.`,
    },
    {
      label: t("slippage"),
      value: (
        <BorderedInput
          type="text"
          labelPlacement="outside"
          placeholder={t("take-profit-price")}
          value={slippage}
          onChange={handleChangeSlippage}
          size="sm"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-small text-stone-200">%</span>
            </div>
          }
          className="w-[60px]"
          classNames={{
            input: "text-xs",
          }}
        />
      ),
      helperText: t("slippage-description"),
    },
    {
      label: t("notional-value"),
      value: `${getPriceStr(collateralAmount * leverage)} ${collateralType}`,
      helperText: t("collateral-leverage"),
    },
    {
      label: t("position-size"),
      value: `${getPriceStr((collateralAmount * leverage) / collateralPriceUsd / price)} ${pair.to === "USD" ? pair.from : `${pair.from}/${pair.to}`}`,
      helperText: t("collateral-leverage"),
    },
    {
      label: t("fees"),
      value: feeValue,
      helperText: t("learn-more"),
    },
    {
      label: t("liq-price"),
      value: liquidationPriceValue,
      helperText: t("liq-price-description"),
    },
    {
      label: t("funding-rate"),
      value: fundingRateValue,
      helperText: "",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex justify-between text-xs">
          <Tooltip
            placement="bottom"
            radius="sm"
            content={item.helperText}
            delay={2000}
            offset={10}
            classNames={{
              base: "max-w-[300px]",
            }}
          >
            <div className="flex cursor-help items-end border-b border-dotted border-b-gray-500 text-gray-500">
              {item.label}
            </div>
          </Tooltip>
          <div className="flex items-end font-normal uppercase text-gray-400">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
