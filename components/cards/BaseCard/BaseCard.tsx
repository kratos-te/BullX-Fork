"use client";

import { Card, CardProps, CardSlots } from "@nextui-org/react";
import { mergeClassNames } from "@/utils/mergeClassNames";

export type BaseCardProps = CardProps;

export default function BaseCard({ classNames, ...rest }: CardProps) {
  return (
    <Card
      {...rest}
      aria-label="BaseCard"
      classNames={mergeClassNames<CardSlots>(
        {
          base: "bg-neutral-950 rounded border border-neutral-800 px-2 py-1",
        },
        classNames,
      )}
    />
  );
}
