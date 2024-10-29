"use client";

import Image from "next/image";

import logo from "@/assets/icons/logo.png";

export type DetailedInfoItem = {
  title: string;
  label_1: string;
  label_2: string;
  label_3: string;
  label_4: string;
  label_5: string;
  value_1: number;
  value_2: number;
  value_3: number;
  value_4: number;
  value_5: number;
  loyal_data?: {
    time: string;
    day: number;
    fee: number;
    points: number;
  };
};

export type DetailedInfoItemProps = {
  data: DetailedInfoItem[];
};

export type LoyaltyInfo = Pick<DetailedInfoItem, "loyal_data">;

const DetailTable = ({ loyal_data }: LoyaltyInfo) => (
  <table className="w-full border-collapse text-left text-xs">
    <thead>
      <th className="border-1 border-stroke pl-2">Day</th>
      <th className="border-1 border-stroke pl-2">Fee</th>
      <th className="border-1 border-stroke pl-2">Points</th>
    </thead>
    <tbody>
      <td className="border-1 border-stroke pl-2" width={30}>
        {loyal_data?.day}
      </td>
      <td className="border-1 border-stroke pl-2" width={35}>
        $ {loyal_data?.fee}
      </td>
      <td className="border-1 border-stroke pl-2" width={35}>
        {loyal_data?.points}
      </td>
    </tbody>
  </table>
);

export default function DetailedInfo({ data }: DetailedInfoItemProps) {
  return data.map((item, index) => (
    <div key={index} className="mt-6">
      <div className="">
        <div className="w-fit border-b-2 border-dotted border-gray-600 text-base font-semibold">
          {item.title}
        </div>
        {item.loyal_data && (
          <div className="text-sm text-gray-400">{item.loyal_data?.time}</div>
        )}
      </div>
      {item.loyal_data && (
        <div>
          <div className="mt-4 w-fit border-b-1 border-dotted border-gray-600 text-[13px] text-gray-400">
            Your Daily Fees
          </div>
          <div className="mt-1">
            <DetailTable loyal_data={item.loyal_data} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 border-b-1 border-stroke py-6">
        <div className="">
          <div className="text-[13px] text-gray-400">{item.label_1}</div>
          <div className="text-[14px]">${item.value_1}</div>
        </div>
        <div className="">
          <div className="text-[13px] text-gray-400">{item.label_2}</div>
          <div className="text-[14px]">${item.value_2}</div>
        </div>
        <div className="">
          <div
            className="w-fit border-b-1 border-dotted border-gray-500 !bg-clip-text text-[13px] font-semibold text-indigo-400 text-transparent"
            style={{
              background:
                "linear-gradient(106deg,#8A9CFF 0%,#FF98FA 50%, #FFAB91 95%)",
            }}
          >
            {item.label_3}
          </div>
          <div className="flex items-center gap-1 text-[14px]">
            <div>{item.value_3}</div>
            <div className="flex h-4 w-4 items-center justify-center rounded-2xl border-1 border-emerald-300 pr-[2px]">
              <Image src={logo} alt="Logo" width={8} height={8} />
            </div>
          </div>
        </div>
        <div className="">
          <div className="w-fit border-b-1 border-dotted border-gray-600 text-[13px] text-gray-400">
            {item.label_4}
          </div>
          <div className="flex items-center gap-1 text-[14px]">
            <div>{item.value_4}</div>
            <div className="flex h-4 w-4 items-center justify-center rounded-2xl border-1 border-emerald-300 pr-[2px]">
              <Image src={logo} alt="Logo" width={8} height={8} />
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-[13px] text-gray-400">{item.label_5}</div>
          <div className="text-[14px]">{item.value_5} %</div>
        </div>
      </div>
    </div>
  ));
}
