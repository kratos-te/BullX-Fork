"use client";

import { mergeClassNames } from "@/utils/mergeClassNames";
import { InputProps, InputSlots } from "@nextui-org/react";

import BaseInput from "@/components/inputs/BaseInput/BaseInput";

export default function BorderedInput({ classNames, ...rest }: InputProps) {
  return (
    <BaseInput
      variant="flat"
      {...rest}
      classNames={mergeClassNames<InputSlots>(
        {
          base: "flex border bg-neutral-800 border-gray-800 rounded-md",
          inputWrapper:
            "bg-transparent group-data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
          input: "p-0 text-lg",
        },
        classNames,
      )}
    />
  );
}
