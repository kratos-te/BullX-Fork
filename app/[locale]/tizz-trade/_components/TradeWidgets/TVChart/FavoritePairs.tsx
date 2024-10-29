"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { Pair } from "@gainsnetwork/sdk";
import { Button } from "@nextui-org/react";

import PairIcon from "@/components/icons/PairIcon";

import TextButton from "@/components/buttons/TextButton/TextButton";
import { getPriceStr } from "@/utils/price";

import NavArrowLeftIcon from "@/components/icons/NavArrowLeftIcon";
import NavArrowRightIcon from "@/components/icons/NavArrowRightIcon";

export type PairWithPriceInfo = Pair & {
  price: number | null;
  percentage: number | null;
};

export type FavoritePairsProps = {
  pairs: PairWithPriceInfo[];
  selected: number;
  onSelect(pairIndex: number): void;
};

export default function FavoritePairs({
  pairs,
  selected,
  onSelect,
}: FavoritePairsProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [overflowed, setOverflowed] = useState(false);

  const checkOverflow = useCallback(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (element.scrollWidth > element.clientWidth + 20) {
      setOverflowed(true);
    } else {
      setOverflowed(false);
    }
  }, []);
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(checkOverflow);

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkOverflow]);

  useEffect(() => {
    if (pairs.length > 0) {
      checkOverflow();
    }
  }, [checkOverflow, pairs]);

  const handleClickMoveLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({
        top: 0,
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const handleClickMoveRight = () => {
    if (ref.current) {
      ref.current.scrollBy({
        top: 0,
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex w-[calc(100%-50px)] items-center px-8">
      {overflowed ? (
        <>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="absolute left-0"
            onClick={handleClickMoveLeft}
          >
            <NavArrowLeftIcon className="text-gray-400" />
          </Button>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="absolute right-0"
            onClick={handleClickMoveRight}
          >
            <NavArrowRightIcon className="text-gray-400" />
          </Button>
        </>
      ) : null}
      <div
        className="flex w-[calc(100%-20px)] items-center overflow-hidden"
        ref={ref}
      >
        {pairs.map((pair) => (
          <TextButton
            key={pair.pairIndex}
            onClick={() => onSelect(pair.pairIndex)}
            className="h-8 w-fit shrink-0 border-r border-stroke"
          >
            <PairIcon from={pair.from} to={pair.to} height={24} width={24} />
            <div
              className={twMerge(
                selected === pair.pairIndex ? "text-white" : "text-gray-400",
              )}
            >
              {pair.name}
            </div>
            <div
              className={twMerge(
                "text-sm",
                pair.percentage !== null && pair.percentage > 0
                  ? "text-emerald-400"
                  : "text-red-400",
                selected === pair.pairIndex
                  ? "text-opacity-100"
                  : "text-opacity-80",
              )}
            >
              {getPriceStr(pair.price || 0)}
            </div>
          </TextButton>
        ))}
      </div>
    </div>
  );
}
