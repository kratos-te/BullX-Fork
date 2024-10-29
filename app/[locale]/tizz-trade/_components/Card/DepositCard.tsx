"use client";

import { useTranslations } from "next-intl";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import BaseSelector from "@/components/selects/BaseSelector/BaseSelector";
import BaseButton from "@/components/buttons/BaseButton/BaseButton";
import TokenIcon from "@/components/icons/TokenIcon";

export default function DepositCard() {
  const t = useTranslations("Trade-DepositCard");

  return (
    <BaseCard classNames={{ base: "p-6 bg-neutral-900" }}>
      <div className="flex gap-[60px]">
        <div className="w-1/2">
          <div className="flex flex-col gap-3.5">
            <div className="text-2xl font-semibold text-white">Deposit</div>
            <div className="flex gap-1">
              <BaseButton className="h-9 rounded border border-gray-800 bg-orange-300 px-4 py-2.5 text-sm text-black">
                {t("deposit")}
              </BaseButton>
              <BaseButton className="h-9 rounded border border-gray-800 bg-neutral-800 px-4 py-2.5 text-sm text-gray-400">
                {t("withdraw")}
              </BaseButton>
            </div>
          </div>
          <div className="my-3.5 h-[1px] w-full bg-gray-800"></div>
          <div className="flex flex-col gap-3.5">
            <div className="text-sm leading-tight text-gray-400">
              {t("description1")}
            </div>
            <div className="inline-flex h-[55px] items-start justify-start gap-2 rounded-lg border border-yellow-800 px-2 py-3.5">
              <div className="flex h-6 w-6 items-center justify-center">
                <div className="relative h-6 w-6"></div>
              </div>
              <div className="flex h-[27px] shrink grow basis-0 items-center justify-start gap-3.5">
                <div className="shrink grow basis-0 text-xs font-normal leading-[18px] text-gray-600">
                  {t("description2")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-3.5">
          <div className="flex flex-col gap-2">
            <BaseCard
              classNames={{
                base: "py-2.5 px-3.5 gap-1 bg-neutral-800 border border-gray-800",
              }}
            >
              <>
                <div className="text-sm font-normal leading-tight text-gray-400">
                  {t("send")}
                </div>
                <div className="flex justify-between">
                  <div className="text-3xl font-semibold text-white">0</div>
                  <BaseSelector
                    classNames={{
                      base: "w-[100px] bg-gray-800 rounded-xl border-zinc-700",
                      innerWrapper: "",
                      value: "pl-2 justify-center text-sm font-semibold",
                      selectorIcon: "text-gray-400",
                    }}
                    items={[
                      {
                        id: "DAI",
                        label: "DAI",
                        icon: <TokenIcon token="dai" width={16} height={16} />,
                      },
                    ]}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-400">0</div>
                  <div className="font-xs rounded-md border border-zinc-700 bg-gray-800 px-2 py-1 text-xs">
                    {t("max")}
                  </div>
                </div>
              </>
            </BaseCard>
            <BaseCard
              classNames={{
                base: "py-2.5 px-3.5 gap-1 bg-neutral-800 border border-gray-800",
              }}
            >
              <>
                <div className="text-sm font-normal leading-tight text-gray-400">
                  {t("send")}
                </div>
                <div className="flex justify-between">
                  <div className="text-3xl font-semibold text-white">0</div>
                  <BaseSelector
                    classNames={{
                      base: "w-[100px] bg-gray-800 rounded-xl border-zinc-700",
                      innerWrapper: "",
                      value: "pl-2 justify-center text-sm font-semibold",
                      selectorIcon: "text-gray-400",
                    }}
                    items={[
                      {
                        id: "DAI",
                        label: "DAI",
                        icon: <TokenIcon token="dai" width={16} height={16} />,
                      },
                    ]}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-400">0</div>
                  <div className="font-xs rounded-md border border-zinc-700 bg-gray-800 px-2 py-1 text-xs">
                    {t("max")}
                  </div>
                </div>
              </>
            </BaseCard>
          </div>
          <div className="inline-flex w-full items-start justify-start gap-2 rounded-lg border border-gray-800 px-2 py-3.5">
            <div className="flex h-[9px] shrink grow basis-0 items-center justify-start gap-3.5">
              <div className="shrink grow basis-0 text-xs font-normal leading-[18px] text-gray-400">
                1 DAI = 0.8743 tBTC
              </div>
            </div>
          </div>
          <div className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-gray-800 bg-neutral-800 px-4 py-2.5 shadow">
            <div className="text-justify text-sm font-normal leading-none text-white">
              {t("approve")}
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
