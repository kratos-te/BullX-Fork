import { Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";

import TextButton from "@/components/buttons/TextButton/TextButton";
import GainsTrading from "@/components/icons/GainsTrading";

export default function Footer() {
  const t = useTranslations("Trade-Footer");

  return (
    <footer className="fixed bottom-0 flex w-full items-center justify-between border-t border-t-stroke bg-tizz-background">
      <div className="flex items-center gap-2 p-1">
        <TextButton className="px-2 py-[2px] text-[11px]">
          <span className="h-3 w-3 rounded-md bg-emerald-400 bg-opacity-20" />
          {t("operational")}
        </TextButton>
        <Divider orientation="vertical" />
        <TextButton className="gap-1 px-2 py-[2px] text-[11px]">
          {t("help-and-support")}
        </TextButton>
      </div>
      <div className="flex items-center gap-2 p-1">
        <TextButton className="px-2 py-[2px] text-[11px]">0.12</TextButton>
        <Divider orientation="vertical" />
        <TextButton className="gap-1 px-2 py-[2px] text-[11px]">
          <GainsTrading viewBox="0 0 11 11" size={11} />
          {t("fast")}
        </TextButton>
      </div>
    </footer>
  );
}
