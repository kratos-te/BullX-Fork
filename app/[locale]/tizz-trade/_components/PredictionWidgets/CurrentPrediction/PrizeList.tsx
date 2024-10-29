import { getPriceStr } from "@/utils/price";

import { PayoutBadge } from "../components/PayoutBadge";
import { ChangeRateBadge } from "../components/ChangeRateBadge";

export type PrizeListProps = {
  price: number;
  upPayout: number;
  downPayout: number;
  changeRate: number;
};

export function PrizeList({
  price,
  upPayout,
  downPayout,
  changeRate,
}: PrizeListProps) {
  return (
    <div className="z-10 flex flex-col items-center gap-6 2xl:gap-[50px]">
      <div className="flex flex-col items-center gap-3.5 2xl:gap-10">
        <h6 className="text-center text-2xl font-black leading-loose text-white 2xl:text-3xl 2xl:leading-[38px]">
          Prize List
        </h6>
        <div className="flex items-center justify-start gap-2.5">
          <h6 className="text-center font-black leading-[60px] text-[#ffcc00] 2xl:text-[88px]">
            ${getPriceStr(price)}
          </h6>
          <ChangeRateBadge rate={changeRate} />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <PayoutBadge variant="contained" payout={upPayout} badgetType="up" />
        <PayoutBadge variant="contained" payout={downPayout} badgetType="down" />
      </div>
    </div>
  );
}
