"use client";

import { Key, ReactNode, useTransition } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter, usePathname } from "@/navigation";
import { twMerge } from "tailwind-merge";

import TranslateIcon from "@/components/icons/TranslateIcon";

import { languageList } from "./LocaleSwitcherContent";

export default function LocaleSwitcherSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChangeLocale = (nextLocale: Key) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale as string });
    });
  };

  return (
    <Dropdown
      className={twMerge(isPending && "opacity-30 transition-opacity")}
      isDisabled={isPending}
    >
      <DropdownTrigger>
        <Button
          isIconOnly
          className="z-30 w-fit !min-w-0 !border-none bg-transparent !p-0 text-white hover:scale-105"
        >
          <TranslateIcon size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Switch Locale" onAction={handleChangeLocale}>
        {languageList.map((lang) => (
          <DropdownItem key={lang.locale}>{lang.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
