import React from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "@nextui-org/react";

import BaseButton from "../BaseButton/BaseButton";

type TabButtonProp = ButtonProps & {};

export default function TabButton({ className, ...rest }: TabButtonProp) {
  return (
    <BaseButton
      fullWidth
      variant="bordered"
      radius="sm"
      {...rest}
      className={twMerge(
        "justify-start gap-2 border-none px-5 py-2 text-base",
        className,
      )}
    />
  );
}
