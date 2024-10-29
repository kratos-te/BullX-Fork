"use client";

import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import FlatInput from "@/components/inputs/FlatInput/FlatInput";
import Button from "@/components/buttons/Button/Button";

import Balance from "@/tizz-trade-components/TradeWidgets/TradeSidebar/CollateralPanel/Balance";

export type InputPanelProps = {
  invalid?: boolean;
  balance: number;
  amount: string;
  onChange(value: string): void;
};

export function InputPanel({
  invalid,
  balance,
  amount,
  onChange,
}: InputPanelProps) {
  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value)) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl font-semibold text-white">Set Your Bet</span>
      <BaseCard
        classNames={{
          base: twMerge(
            "flex flex-col gap-1 rounded-md",
            "bg-[#1e1e27] text-xs p-3.5",
            invalid ? "border-red-800" : "border-[#282834]",
          ),
        }}
      >
        <div className="flex h-8 items-center justify-between">
          <FlatInput
            inputMode="decimal"
            type=""
            pattern="^([0-9]+(?:[.,][0-9]*)?)$"
            autoComplete="off"
            value={amount}
            onChange={handleChangeAmount}
          />

          <div className="flex items-center gap-2">
            {[25, 50, 100].map((item) => (
              <Button
                key={item}
                className="min-w-0 border-[#373748] bg-[#2b2b38] py-1.5 leading-none"
                onClick={() => onChange((balance * item) / 100 + "")}
              >
                {item === 100 ? "Max" : `${item}%`}
              </Button>
            ))}
          </div>
        </div>

        <Balance balance={balance} unit="BTC" />
      </BaseCard>
    </div>
  );
}
