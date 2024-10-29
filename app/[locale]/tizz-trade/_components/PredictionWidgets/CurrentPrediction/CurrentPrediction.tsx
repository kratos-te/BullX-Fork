import Image from "next/image";

import { getPriceStr } from "@/utils/price";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

import hexabg1 from "@/assets/images/hexabg1.svg";

import { PredictionTimer } from "./PredictionTimer";
import { PredictionStatus } from "./PredictionStatus";
import { PredictionNumber } from "./PredictionNumber";
import { PrizeList } from "./PrizeList";

export function CurrentPrediction() {
  const prizeItems = [
    {
      label: "Locked Prize",
      value: `$${getPriceStr(515.4502)}`,
    },
    {
      label: "Prize Pool",
      value: `${getPriceStr(2.841)} BTC`,
    },
  ];

  return (
    <BaseCard
      classNames={{
        base: "py-6 justify-center min-h-[400px] rounded-[14px] border-[#282834] w-full gap-[38px] items-center bg-neutral-900 relative",
      }}
    >
      <div className="absolute bottom-[50px] left-0 h-[210px] w-[198px] rounded-full bg-[#03ff0d] blur-[80px]" />

      <div className="absolute right-0 top-[38px] h-[218px] w-[222px] rounded-full bg-[#03ff0d] blur-[80px]" />

      <Image
        src={hexabg1}
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        alt="bg"
      />
      <div className="z-10 flex items-center gap-5 2xl:gap-[66px]">
        <PredictionTimer remainSec={240} />
        <PredictionStatus status="live" />
        <PredictionNumber predictionId={12345} />
      </div>

      <PrizeList
        price={523000}
        upPayout={1.92}
        downPayout={2.38}
        changeRate={12.7}
      />

      <div className="z-10 flex items-center gap-6 2xl:gap-10">
        {prizeItems.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <span className="text-center text-base font-medium leading-snug text-[#aaaaaa] 2xl:text-lg">
              {item.label}
            </span>
            <span className="text-2xl font-bold leading-loose text-[#ffcc00] 2xl:text-[33px]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </BaseCard>
  );
}
