"use client";

import { Key, useTransition } from "react";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "@/navigation";

export const languageList = [
  { label: "English", locale: "en" },
  { label: "Spanish", locale: "es" },
  { label: "French", locale: "fr" },
  { label: "Hindi", locale: "hi" },
  { label: "Japanese", locale: "ja" },
  { label: "Portuguese", locale: "pt" },
  { label: "Chinese", locale: "zh-CN" },
];

export default function LocaleSwitcherContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChangeLocale = (nextLocale: Key) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale as string });
    });
  };

  return (
    <div className="flex flex-col gap-1">
      {languageList.map((lang) => (
        <Button
          key={lang.locale}
          onClick={() => handleChangeLocale(lang.locale)}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
}
