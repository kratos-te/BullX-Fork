"use client";

import { ChangeEvent } from "react";
import { useTranslations } from "next-intl";

import { twMerge } from "tailwind-merge";
import { CollateralTypes } from "@/utils/tizz";

import TokenIcon from "@/components/icons/TokenIcon";

import TokenSelector, {
  TokenSelectorItem,
} from "@/components/selects/TokenSelector/TokenSelector";
import BaseCard from "@/components/cards/BaseCard/BaseCard";
import FlatInput from "@/components/inputs/FlatInput/FlatInput";
import Button from "@/components/buttons/Button/Button";

import GetCollateralButton, { collateralLabel } from "./GetCollateralButton";
import Balance from "./Balance";
import { formatNumber } from "@/utils/price";

export const minimumCollateralUsd = 10;

export const tizzCollateralItems: TokenSelectorItem[] = [
  {
    id: CollateralTypes.WBTC,
    label: "WBTC",
    icon: <TokenIcon token="btc" width={18} height={18} />,
  },
  {
    id: CollateralTypes.USDT,
    label: "USDT",
    icon: <TokenIcon token="usdt" width={18} height={18} />,
  },
];

export type Collateral = {
  type: CollateralTypes;
  amount: number;
};

export type CollateralPanelProps = {
  chainId: number;
  minAmount: number;
  maxAmount: number;
  balance: number;
  invalid?: boolean;
  collateralAmount: string;
  collateralPrecision?: number;
  collateralPriceUsd?: number;
  collateralType: CollateralTypes;
  onChangeAmount(value: string): void;
  onChangeCollateralType(type: CollateralTypes): void;
};

export default function CollateralPanel({
  minAmount,
  maxAmount,
  balance,
  invalid,
  chainId,
  collateralAmount,
  collateralPrecision,
  collateralPriceUsd,
  collateralType,
  onChangeAmount,
  onChangeCollateralType,
}: CollateralPanelProps) {
  const t = useTranslations("Trade-CollateralPanel");

  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value)) {
      onChangeAmount(e.target.value);
    }
  };

  const handleChangeCollateralType = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value.trim() !== "") {
      onChangeCollateralType(e.target.value as CollateralTypes);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <BaseCard
        classNames={{
          base: "bg-tizz-background p-0 border-0 shadow-none flex flex-col gap-[14px]",
        }}
      >
        <div className="flex items-end justify-between ">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xl font-semibold text-white">Collateral</span>
            <span className="text-sm text-gray-400/80">
              ({formatNumber(minAmount, 1)} - {formatNumber(maxAmount, 1)})
            </span>
          </div>
          <GetCollateralButton
            collateralType={collateralType}
            chainId={chainId}
            collateralPrecision={collateralPrecision}
            collateralPriceUsd={collateralPriceUsd}
          />
        </div>
        <BaseCard
          classNames={{
            base: twMerge(
              "flex flex-col gap-1",
              "bg-neutral-800 text-xs p-3.5",
              invalid ? "border-red-800" : "border-gray-800",
            ),
          }}
        >
          <div className="flex h-8 items-center justify-between">
            <FlatInput
              inputMode="decimal"
              type="text"
              pattern="^([0-9]+(?:[.,][0-9]*)?)$"
              autoComplete="off"
              value={collateralAmount}
              onChange={handleChangeAmount}
            />
            <TokenSelector
              items={tizzCollateralItems}
              selectedKeys={[collateralType]}
              onChange={handleChangeCollateralType}
            />
          </div>

          <Balance balance={balance} unit={collateralLabel[collateralType]} />
        </BaseCard>
      </BaseCard>
      <div className="flex items-center justify-between gap-2">
        {[25, 50, 75, 100].map((item) => (
          <Button
            key={item}
            className="bg-neutral-800 py-1.5 leading-none"
            onClick={() => onChangeAmount((balance * item) / 100 + "")}
          >
            {item === 100 ? t("max") : `${item}%`}
          </Button>
        ))}
      </div>
    </div>
  );
}
