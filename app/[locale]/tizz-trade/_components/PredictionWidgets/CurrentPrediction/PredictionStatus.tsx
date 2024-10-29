import Image from "next/image";

import hexatizzSrc from "@/assets/icons/hexatizz.svg";

export function PredictionStatus({ status }: { status: string }) {
  return (
    <div className="relative flex h-5 w-[100px] items-center justify-center rounded-full border border-[#572721] bg-gradient-to-b from-[#ffcc00] to-[#993700] text-base font-bold uppercase text-[#fffcfa] 2xl:h-[36px] 2xl:w-[170px] 2xl:border-2 2xl:px-[80px] 2xl:py-[4px]">
      <Image
        src={hexatizzSrc}
        className="absolute -bottom-1 -left-1 h-[27px] w-[24px] 2xl:-bottom-2 2xl:h-[48px] 2xl:w-[42px]"
        alt="hexatizz"
      />
      <Image
        src={hexatizzSrc}
        className="absolute -bottom-1 -right-1 h-[27px] w-[24px] 2xl:-bottom-2 2xl:h-[48px] 2xl:w-[42px]"
        alt="hexatizz"
      />
      {status}
    </div>
  );
}
