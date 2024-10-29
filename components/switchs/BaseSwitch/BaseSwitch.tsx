"use client";

import React from "react";
import { Switch, SwitchProps } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export type SwitchItem = {
  label: string;
  isSelected: boolean;
  setIsSelected: (val: boolean) => void;
};

export type BaseSwitchProps = SwitchProps & SwitchItem;

export default function BaseSwitch({
  label,
  isSelected,
  setIsSelected,
  classNames,
  ...rest
}: BaseSwitchProps) {
  return (
    <div className={twMerge("flex justify-start gap-2", classNames?.wrapper)}>
      <div className={twMerge("text-base font-semibold", classNames?.label)}>
        {label}
      </div>
      <Switch
        color="warning"
        isSelected={isSelected}
        onChange={() => setIsSelected(!isSelected)}
        size="sm"
        classNames={{
          wrapper: "p-0 h-4 overflow-visible w-[33px]",
        }}
        {...rest}
      />
    </div>
  );
}
