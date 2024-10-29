import Image from "next/image";

import beehiveSrc from "@/assets/icons/beehive.svg";

export function PredictionNumber({ predictionId }: { predictionId: number }) {
  return (
    <div className="relative flex h-6 items-center justify-center rounded-full border border-[#6f3428] bg-[#26100d] px-[15px] pl-[30px] pr-[15px] text-base font-bold text-[#ffcc00] 2xl:h-[36px] 2xl:w-[170px] 2xl:pr-[30px]">
      <Image
        src={beehiveSrc}
        className="absolute -bottom-[3px] -left-1 h-[30px] w-[27px] 2xl:-bottom-2 2xl:-left-6 2xl:h-[56px] 2xl:w-[50px]"
        alt="beehive"
      />
      #{predictionId}
    </div>
  );
}
