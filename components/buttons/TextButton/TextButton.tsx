import { ButtonProps } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import BaseButton from "../BaseButton/BaseButton";

export type TextButtonProps = ButtonProps & {
  active?: boolean;
};

export default function TextButton(props: TextButtonProps) {
  const { active, ...rest } = props;

  return (
    <BaseButton
      {...rest}
      variant="light"
      className={twMerge(
        "rounded p-3 text-sm font-bold text-gray-400",
        active ? "bg-transparent text-white" : "bg-transparent",
        rest.className,
      )}
    />
  );
}
