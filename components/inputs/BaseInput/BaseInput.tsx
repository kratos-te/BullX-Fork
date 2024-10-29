"use client";

import { mergeClassNames } from "@/utils/mergeClassNames";
import { Input, InputProps, InputSlots } from "@nextui-org/react";

export type BaseInputProps = InputProps;

export default function BaseInput({ classNames, ...rest }: InputProps) {
  return (
    <Input
      aria-label="BaseInput"
      {...rest}
      classNames={mergeClassNames<InputSlots>({}, classNames)}
    />
  );
}
