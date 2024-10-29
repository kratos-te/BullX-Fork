import { ButtonProps } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import BaseButton from "../BaseButton/BaseButton";

export default function Button(props: ButtonProps) {
  return (
    <BaseButton
      {...props}
      variant="bordered"
      className={twMerge(
        "border border-stroke p-2 text-xs text-gray-400",
        props.className,
      )}
    />
  );
}
