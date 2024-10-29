"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Accordion,
  Button,
  AccordionItem,
} from "@nextui-org/react";
import { Link } from "@/navigation";

import WalletConnectButton from "@/tizz-trade-components/WalletConnectButtons/WalletConnectButton";

import SettingIcon from "@/components/icons/SettingIcon";
import BgButton from "@/components/buttons/BgButton/BgButton";

import bookSrc from "@/assets/icons/book.svg";
import PointIcon from "@/components/icons/PointIcon";
import TranslateIcon from "@/components/icons/TranslateIcon";

import LocaleSwitcherContent from "@/components/LocaleSwitcher/LocaleSwitcherContent";

export default function RightNavbar() {
  const t = useTranslations("Trade-RightNavbar");

  return (
    <div className="flex items-center gap-3 md:gap-5">
      <Link href="#">
        <BgButton className="hidden border-0 bg-neutral-500 bg-gradient-to-r from-orange-400 to-amber-300 px-2 text-neutral-900 xl:flex">
          <PointIcon />
          <span className="leading-loose">{t("points")}: 0</span>
        </BgButton>
      </Link>

      <Link href="#">
        <BgButton className="hidden border-1 border-neutral-500 text-white xl:flex">
          <Image src={bookSrc} alt="Logo" />
          <span className="leading-loose">{t("learn-more")}</span>
        </BgButton>
      </Link>

      <WalletConnectButton />

      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button
            isIconOnly
            className="!min-w-0 border-0 bg-transparent"
            color="default"
          >
            <SettingIcon
              viewBox="0 0 24 24"
              size={24}
              className="text-[#82828F]"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Accordion>
            <AccordionItem
              key="language"
              aria-label="language"
              indicator={<TranslateIcon size={24} />}
              title={t("language")}
            >
              <LocaleSwitcherContent />
            </AccordionItem>
          </Accordion>
        </PopoverContent>
      </Popover>
    </div>
  );
}
