"use client";

import { CardSlots } from "@nextui-org/react";
import BaseCard, { BaseCardProps } from "../BaseCard/BaseCard";
import { mergeClassNames } from "@/utils/mergeClassNames";

export type GreenCardProps = BaseCardProps;

export default function GreenCard({ classNames, ...rest }: GreenCardProps) {
  return (
    <BaseCard
      {...rest}
      classNames={mergeClassNames<CardSlots>(
        {
          base: "bg-green-950 bg-opacity-50 rounded-[15px] border border-neutral-600",
        },
        classNames,
      )}
    />
  );
}
