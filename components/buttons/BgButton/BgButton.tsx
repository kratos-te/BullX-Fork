"use client";

import { ButtonProps } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import BaseButton from "@/components/buttons/BaseButton/BaseButton";

export default function BgButton(props: ButtonProps) {
  return (
    <BaseButton
      {...props}
      variant="bordered"
      className={twMerge(
        "relative min-h-10 w-fit items-center justify-center border border-gray-800 p-0 text-gray-400",
        props.className,
      )}
    >
      <div className="flex items-center gap-1 px-3">{props.children}</div>
    </BaseButton>
  );
}
