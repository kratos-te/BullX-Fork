"use client";

import { useTranslations } from "next-intl";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

import ClockIcon from "@/components/icons/ClockIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import DotIcon from "@/components/icons/DotIcon";

export default function TeamStatus() {
  const t = useTranslations("Trade-TeamStatus");

  return (
    <BaseCard
      classNames={{
        base: "py-3.5 px-6 bg-neutral-900 gap-3.5 md:gap-8 w-full",
      }}
    >
      <div className="flex w-full flex-col gap-[14px]">
        <div className="flex w-full md:gap-[80px]">
          <div className="w-1/3">
            <div className="text-base font-semibold leading-normal text-white md:text-2xl md:font-medium md:leading-loose">
              {t("when")}
            </div>
            <div className="text-base font-normal leading-normal text-gray-400 md:text-xl md:leading-[30px]">
              August 5
            </div>
          </div>
          <div className="w-1/3">
            <div className="text-base font-semibold leading-normal text-white md:text-2xl md:font-medium md:leading-loose">
              {t("time")}
            </div>
            <div className="text-base font-normal leading-normal text-gray-400 md:text-xl md:leading-[30px]">
              19:00:00
            </div>
          </div>
          <div className="w-1/3">
            <div className="text-semibold flex items-center gap-1 text-base leading-normal text-[#00FF66] md:text-2xl md:font-medium md:leading-loose">
              <div>{t("active")}</div>
              <DotIcon />
            </div>
            <div className="text-base font-normal leading-normal text-gray-400 md:text-xl md:leading-[30px]">
              {t("status")}
            </div>
          </div>
        </div>
        <div className="h-2 rounded-3xl border border-gray-800 bg-neutral-900">
          <div className="h-2 w-[200px] rounded-3xl bg-amber-300"></div>
        </div>
        <div className="flex gap-6">
          <div className="text-xs font-bold leading-7 text-white md:text-lg md:font-semibold">
            {t("round-ends-in")}:
          </div>
          <div className="flex gap-[21px]">
            <div className="flex items-center gap-1 text-xs font-normal text-gray-400">
              <div>19:00:00</div>
              <div>
                <ClockIcon width={18} height={18} />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-normal text-gray-400">
              <div>August 6, 2023</div>
              <div>
                <CalendarIcon width={18} height={18} fill="#9494A8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
