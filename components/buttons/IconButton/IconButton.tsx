import { ButtonProps } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import BaseButton from "../BaseButton/BaseButton";

export default function IconButton(props: ButtonProps) {
  return (
    <BaseButton
      {...props}
      isIconOnly
      className={twMerge("!min-w-0 border-0 bg-transparent", props.className)}
    />
  );
}
