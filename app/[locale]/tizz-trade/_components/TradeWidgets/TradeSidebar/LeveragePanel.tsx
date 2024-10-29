"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { SliderValue } from "@nextui-org/react";
import { useTranslations } from "next-intl";

import LeverageSilder from "@/components/sliders/LeverageSlider/LeverageSlider";
import BorderedInput from "@/components/inputs/BorderedInput/BorderedInput";

export type LeveragePanelProps = {
  minLeverage: number;
  maxLeverage: number;
  leverage: SliderValue;
  onChange(leverage: SliderValue): void;
};

export default function LeveragePanel({
  minLeverage,
  maxLeverage,
  leverage,
  onChange,
}: LeveragePanelProps) {
  const t = useTranslations("Trade-LeveragePanel");

  const [inputValue, setInputValue] = useState(minLeverage);

  useEffect(() => {
    setInputValue(minLeverage);
    onChange(minLeverage);
  }, [minLeverage, onChange]);

  const handleChangeLeverage = (value: SliderValue) => {
    onChange(value);
    setInputValue(value as number);
  };

  const handleChangeLeverageValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (!Number.isNaN(+e.target.value)) {
      setInputValue(+e.target.value);

      if (+e.target.value >= minLeverage && +e.target.value <= maxLeverage) {
        onChange(+e.target.value);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <div className="mb-2 flex w-fit items-center justify-start gap-1">
          <div className="text-xl font-semibold">{t("leverage")}</div>
          <div className="text-sm text-gray-400">{`(${minLeverage}x - ${maxLeverage}x)`}</div>
        </div>

        <BorderedInput
          type="text"
          labelPlacement="outside"
          value={inputValue + ""}
          onChange={handleChangeLeverageValue}
          className="w-[160px]"
        />
      </div>
      <LeverageSilder value={leverage} onChange={handleChangeLeverage} />
    </div>
  );
}
