"use client";

import SearchIcon from "@/components/icons/SearchIcon";
import { Input, InputProps } from "@nextui-org/react";

export type BaseInputProps = InputProps;

export default function SearchInput({ classNames, ...rest }: InputProps) {
  return (
    <Input
      isClearable
      radius="lg"
      classNames={{
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent h-3 text-gray-400",
        inputWrapper: [
          "h-9",
          "w-full",
          "shadow-xl",
          "bg-neutral-950",
          "border",
          "rounded-md",
          "border-neutral-800",
          "dark:bg-neutral-950",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "group-data-[focused=true]:bg-default-200/50",
          "dark:group-data-[focused=true]:bg-default/60",
          "!cursor-text",
        ],
      }}
      placeholder="Type to search..."
      startContent={<SearchIcon />}
    />
  );
}
