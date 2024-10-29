"use client";

import { CardProps } from "@nextui-org/react";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

export type Portfolio = {
  title: string;
  textIcon: React.ReactNode;
  icon?: React.ReactNode;
  value: string;
  data?: string;
};

export type PortfolioCardProps = { data: Portfolio } & CardProps;

export default function PortfolioCard({ data, ...rest }: PortfolioCardProps) {
  return (
    <BaseCard
      classNames={{
        base: "flex h-[125px] flex-col justify-between rounded-md border-[1px] border-[#221f31] bg-[#15151d] p-[25px]",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded border-1 border-stroke bg-slate-300 bg-opacity-5 p-2 shadow">
          {data.textIcon}
        </div>
        <div className="text-base font-semibold">{data.title}</div>
      </div>

      <div className="flex items-center justify-between text-2xl font-semibold">
        <div className="flex items-center gap-2">
          <div>{data.value}</div>
          {data.icon && (
            <div className="flex h-6 w-6 items-center justify-center rounded-2xl border-1 border-emerald-300 pr-[1px]">
              {data.icon}
            </div>
          )}
        </div>
        {data.data && (
          <div className="relative flex h-[20px] w-[90px] items-center rounded border-[2px] border-emerald-700 text-center text-xs font-semibold text-emerald-300">
            <div className="h-full w-full bg-emerald-300 opacity-25"></div>
            <div className="absolute w-full">{data.data}</div>
          </div>
        )}
      </div>
    </BaseCard>
  );
}
