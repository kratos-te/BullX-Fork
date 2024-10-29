"use client";

import { mergeClassNames } from "@/utils/mergeClassNames";
import { InputProps, InputSlots } from "@nextui-org/react";

import BaseInput from "@/components/inputs/BaseInput/BaseInput";

export default function FlatInput({ classNames, ...rest }: InputProps) {
  return (
    <BaseInput
      variant="flat"
      {...rest}
      classNames={mergeClassNames<InputSlots>(
        {
          input: "text-white text-2xl font-black",
          inputWrapper: [
            "h-full items-center p-0 !bg-transparent max-w-[200px] justify-center",
          ],
        },
        classNames,
      )}
    />
  );
}
