import Image from "next/image";

import arrowGroupSrc from "@/assets/icons/arrowgroup.svg";
import ClockIcon from "@/components/icons/ClockIcon";
import IdIcon from "@/components/icons/IdIcon";

export function Header({ predictionId }: { predictionId: number }) {
  return (
    <div className="flex h-11 w-full items-center justify-between gap-2.5 bg-gradient-to-t from-[#1b1b22] to-[#343445] px-3.5 py-2 lg:h-12">
      <div className="flex items-center gap-2">
        <span className="text-center text-lg font-semibold leading-7 text-[#ffcc00]">
          Next Round
        </span>

        <Image
          src={arrowGroupSrc}
          className="h-[18px] w-[54px]"
          alt="arrowgroup"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2 text-justify text-base font-bold leading-normal text-white lg:rounded-lg lg:border lg:border-[#383848] lg:px-2 lg:py-1">
          <span className="hidden lg:inline-block">
            <IdIcon width={16} height={16} />
          </span>
          #{predictionId}
        </span>

        <span className="hidden items-center gap-2 text-justify text-base font-bold leading-normal text-white lg:flex lg:rounded-lg lg:border lg:border-[#383848] lg:p-2 lg:py-1">
          <ClockIcon width={16} height={16} /> 5:00
        </span>
      </div>
    </div>
  );
}
