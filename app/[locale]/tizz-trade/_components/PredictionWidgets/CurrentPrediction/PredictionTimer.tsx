import Image from "next/image";

import { convertMinAndSec } from "@/utils/price";

import clockSrc from "@/assets/icons/clock.svg";

export function PredictionTimer({ remainSec }: { remainSec: number }) {
  return (
    <div className="relative flex h-6 items-center justify-center rounded-full border border-[#6f3428] bg-[#26100d] px-7 text-base font-bold text-prediction-yellow 2xl:h-[36px] 2xl:w-[170px] 2xl:px-10">
      <Image
        src={clockSrc}
        className="absolute -bottom-[1px] -left-[1px] h-[34px] w-[25px] 2xl:h-[46px] 2xl:w-[35px]"
        alt="clock"
      />
      {convertMinAndSec(remainSec)}
    </div>
  );
}
