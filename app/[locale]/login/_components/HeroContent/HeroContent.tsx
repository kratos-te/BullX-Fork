"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import landingBg from "@/assets/images/layers/main-bg.png";
import logo from "@/assets/images/layers/early-access-logo.png";
import Button from "@/components/buttons/Button/Button";
import TelegramIcon from "@/components/icons/social/TelegramIcon";
import XIcon from "@/components/icons/social/XIcon";
import DiscordIcon from "@/components/icons/social/DiscordIcon";
import { Link } from "@/navigation";
import { redirect } from "@/navigation";


export function HeroContent() {
  const t = useTranslations("Login-HeroContent");

  return (
    <div
      className={twMerge(
        "relative mt-[100px] px-0 py-4 md:mt-[130px]",
        "xl:mt-0 xl:flex xl:h-[844px] xl:w-full xl:flex-col xl:items-center xl:justify-center",
      )}
    >
      <Image
        src={landingBg}
        className="absolute -top-[218px] left-1/2 h-full w-screen -translate-x-1/2 object-cover opacity-60 backdrop-opacity-50 backdrop-filter xl:top-0"
        alt="landing bg"
      />
      <div className="z-1 relative flex -translate-y-[80px] flex-col items-center gap-10 xl:w-[700px] xl:gap-6">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-[20px] font-black leading-[4px]">
            {t("title")}
          </h2>
          <p className="text-center text-[13px] text-gray-400">
            {t("content")}
          </p>
        </div>

        <div className="flex w-full items-center justify-center gap-6 px-12">
          <Link href="#">
            <Button className="rounded-lg border-green-700 bg-green-850 px-12 py-3 text-[13px] leading-4 text-stone-50 hover:bg-green-800"
            onClick={()=> {
              redirect("/tizz-trade/trade");
            }}>
              {t("connect-telegram")}
            </Button>
          </Link>
        </div>
      </div>
      <div className="z-1 absolute bottom-[100px] flex w-full items-center justify-center gap-3 text-[14px] text-gray-500">
        <Link href="#">{t("privacy-policy")}</Link>
        <div className="mt-[2px] h-[18px] w-[1px] bg-gray-800" />
        <Link href="#">{t("terms-of-service")}</Link>
        <div className="mt-[2px] h-[18px] w-[1px] bg-gray-800" />
        <div className="flex">
          <Link href="#">
            <XIcon size={24} className="scale-[55%]" />
          </Link>
          <Link href="#">
            <DiscordIcon size={24} className="scale-[65%]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
