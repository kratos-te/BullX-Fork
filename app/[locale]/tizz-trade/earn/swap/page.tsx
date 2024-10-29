"use client";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import TokenIcon from "@/components/icons/TokenIcon";
import BaseSelector from "@/components/selects/BaseSelector/BaseSelector";
import { EarnInfoItem } from "@/tizz-trade-components/Card/EarnInfo";
import SwapInfo from "@/tizz-trade-components/Card/SwapInfo";
import swapIconSrc from "@/assets/icons/arrange-square-2.png";
import Image from "next/image";

const items: EarnInfoItem[] = [
  {
    label: "Available to Buy",
    value: 0,
    icon: <TokenIcon token="dai" width={24} height={24} />,
  },
  {
    label: "TVL",
    value: 3247,
    icon: <TokenIcon token="dai" width={24} height={24} />,
  },
];

export default function SwapPage() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="flex w-[782px] gap-2.5">
        <BaseCard
          classNames={{
            base: "bg-neutral-900 border border-gray-800 p-3.5",
          }}
        >
          <div className="flex gap-6">
            {items.map((item, index) => (
              <SwapInfo item={item} key={index} />
            ))}
          </div>
        </BaseCard>
        <BaseCard
          classNames={{
            base: "bg-neutral-900 border border-gray-800 p-3.5",
          }}
        >
          <div className="flex gap-6">
            {items.map((item, index) => (
              <SwapInfo item={item} key={index} />
            ))}
          </div>
        </BaseCard>
      </div>
      <div className="relative w-[427px] rounded rounded-bl-md rounded-br-md border border-gray-800 bg-neutral-900 p-3.5">
        <div className="absolute left-0 top-0 flex h-10 w-[427px] border-b-1 border-b-gray-800">
          <div className="flex grow px-6 py-3 text-sm leading-none text-stone-50">
            Buy
          </div>
          <div className="h-full w-[1px] flex-none bg-gray-800"></div>
          <div className="flex grow px-6 py-3 text-sm leading-none text-gray-700">
            Sell
          </div>
        </div>
        <div className="relative mt-10 flex flex-col gap-2">
          <BaseCard
            classNames={{
              base: "py-2.5 px-3.5 gap-1 bg-neutral-800 border border-gray-800",
            }}
          >
            <>
              <div className="text-sm font-normal leading-tight text-gray-400">
                Send
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
                  Max
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
                Send
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
                  Max
                </div>
              </div>
            </>
          </BaseCard>
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-3xl bg-neutral-900">
            <Image src={swapIconSrc} width={28} height={28} alt={""} />
          </div>
        </div>
        <div className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-800 bg-neutral-800 px-5 py-3.5 shadow">
          <div className="text-justify text-base font-normal leading-none text-white">
            Approve
          </div>
        </div>
      </div>
    </div>
  );
}
