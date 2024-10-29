"use client";

import Image from "next/image";

import logo from "@/assets/icons/logo.png";

export type SimpleInfoItem = {
  title: string;
  unit_text: string;
  value_1: number;
  value_2: number;
  time?: string;
};

export type SimpleInfoItemProps = {
  data: SimpleInfoItem[];
};

export default function SimpleInfo({ data }: SimpleInfoItemProps) {
  return data.map((item, index) => (
    <div key={index} className="h-[70px] border-b-1 border-stroke">
      <div className="flex h-full items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="border-b-2 border-dotted border-gray-600 text-base font-semibold">
              {item.title}
            </div>

            <div className="h-[4px] w-[4px] rounded-md bg-pink-400"></div>
            <div className="text-sm text-gray-300">
              ${item.value_1}&nbsp;{item.unit_text}
            </div>
          </div>
          {item.time && (
            <div className="text-xs text-gray-500">{item.time}</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[14px]">{item.value_2}</div>
          <div className="flex h-5 w-5 items-center justify-center rounded-2xl border-1 border-emerald-300 pr-[2px]">
            <Image src={logo} alt="Logo" width={10} height={10} />
          </div>
        </div>
      </div>
    </div>
  ));
}
