"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import logo from "@/assets/icons/BullXLogo.svg";
import Button from "@/components/buttons/Button/Button";
import TelegramIcon from "@/components/icons/social/TelegramIcon";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export type TopNavbarProps = {
  mode: "sticky" | "attached";
};

export function TopNavbar({ mode }: TopNavbarProps) {
  const t = useTranslations("Login-TopNavbar");

  return (
    <nav className="z-10 flex items-center justify-end px-6 py-2">
      <div className="flex items-center justify-end gap-3">
        <Link href="#">
          <Button
            className={twMerge(
              "text-grey-50 !flex !h-[30px] w-fit flex-row items-center rounded !border-green-700 !bg-green-850 !px-[8px] !py-[6px] text-xs font-semibold hover:!bg-green-800 ",
              inter.className,
            )}
          >
            {t("connect")}
          </Button>
        </Link>
        <Link href="#">
          <Button
            className={twMerge(
              "text-grey-50 !flex !h-[30px] w-fit flex-row items-center rounded !border-green-700 !bg-green-850 !px-[8px] !py-[6px] text-xs font-semibold hover:!bg-green-800 ",
              inter.className,
            )}
          >
            {t("signup")}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
