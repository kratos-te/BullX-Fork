"use client";

import { twMerge } from "tailwind-merge";

import EmptyStarIcon from "@/components/icons/EmptyStarIcon";
import StarIcon from "@/components/icons/StarIcon";
import PriceInfo from "./PriceInfo";
import PairIcon from "@/components/icons/PairIcon";

type PairInfoMenuItemProps = {
  id: number;
  name: string;
  from: string;
  to: string;
  description: string;
  price: number | null;
  percentage: number | null;
  isFavoritePair: boolean;
  selectedPairIndex: number;
  onChangePairIndex(pairIndex: number): void;
  onSelectFavoritePair: (pairIndex: number) => void;
};

export default function PairInfoMenuItem({
  id,
  name,
  from,
  to,
  description,
  price,
  percentage,
  isFavoritePair,
  selectedPairIndex,
  onChangePairIndex,
  onSelectFavoritePair,
}: PairInfoMenuItemProps) {
  const handleSelectFavoritePair = () => {
    onSelectFavoritePair(id);
  };

  return (
    <div
      className={twMerge(
        "group flex h-[56px] cursor-pointer items-center pr-4 hover:bg-stroke/80",
        selectedPairIndex === id && "bg-stroke",
      )}
    >
      <div
        className="flex h-[44px] w-[44px] items-center justify-center pl-1 pr-2"
        onClick={handleSelectFavoritePair}
      >
        {isFavoritePair ? (
          <StarIcon className="cursor-pointer group-hover:scale-125" />
        ) : (
          <EmptyStarIcon className="cursor-pointer group-hover:scale-125" />
        )}
      </div>

      <PairIcon from={from} to={to} width={24} height={24} />

      <div
        className="flex flex-1 items-center justify-between pl-1"
        onClick={() => {
          onChangePairIndex(id);
        }}
      >
        <div>
          <div className="text-base font-semibold">{name}</div>
          <div className="text-xs text-gray-400">{description}</div>
        </div>
        <PriceInfo price={price} percentage={percentage} />
      </div>
    </div>
  );
}
