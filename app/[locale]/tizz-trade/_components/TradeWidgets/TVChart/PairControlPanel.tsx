"use client";

import { ChangeEventHandler, useMemo, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
  Divider,
} from "@nextui-org/react";
import { OpenInterest } from "@gainsnetwork/sdk";

import StarIcon from "@/components/icons/StarIcon";
import PairIcon from "@/components/icons/PairIcon";

import TriangleIcon from "@/components/icons/TriangleIcon";
import SearchIcon from "@/components/icons/SearchIcon";

import PairInfoMenuItem from "./PairInfoMenuItem";
import FavoritePairs, { type PairWithPriceInfo } from "./FavoritePairs";
import PriceInfo from "./PriceInfo";

import PairInfoBar from "./PairInfoBar";

const basicGroupFilters = [
  {
    groupIndex: 0,
    label: "crypto",
  },
  {
    groupIndex: 9,
    label: "forex",
  },
  {
    groupIndex: 4,
    label: "stocks",
  },
  {
    groupIndex: 5,
    label: "indices",
  },
  {
    groupIndex: 6,
    label: "commodities",
  },
];

export type PairControlPanelProps = {
  pairs: PairWithPriceInfo[];
  openInterest: OpenInterest;
  favoritePairIndexs: number[];
  selectedPairIndex: number;
  onChangePairIndex(pairIndex: number): void;
  onSelectFavorite(pairIndex: number): void;
  nextFundingFeeApplyTime: number;
};

export default function PairControlPanel({
  pairs,
  openInterest,
  favoritePairIndexs,
  selectedPairIndex,
  onChangePairIndex,
  onSelectFavorite,
  nextFundingFeeApplyTime,
}: PairControlPanelProps) {
  const [strFilter, setStrFilter] = useState("");
  const [groupIndex, setGroupIndex] = useState<number | null>(null);

  const handleChangeStrFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStrFilter(e.target.value);
  };

  const validPairs = useMemo(
    () =>
      pairs
        .slice(0, 1)
        .filter((pair) => pair.name !== "/" && pair.price !== null),
    [pairs],
  );

  const favoritePairs = useMemo(
    () =>
      validPairs.filter((pair) => favoritePairIndexs.includes(pair.pairIndex)),
    [favoritePairIndexs, validPairs],
  );

  const groupFilters = useMemo(
    () =>
      basicGroupFilters.map((filter) => ({
        ...filter,
        counts: validPairs.filter(
          (pair) => pair.groupIndex === filter.groupIndex,
        ).length,
      })),
    [validPairs],
  );

  const filteredPairs = useMemo(() => {
    return validPairs.filter((pair) => {
      if (pair.name === "/") {
        return false;
      }

      let selected = true;

      if (groupIndex) {
        selected = selected && pair.groupIndex === groupIndex;
      }

      selected =
        selected &&
        pair.name.toLowerCase().includes(strFilter.toLowerCase().trim());

      return selected;
    });
  }, [groupIndex, validPairs, strFilter]);

  const selectedPair = pairs?.[selectedPairIndex];

  return (
    <>
      <div className="hidden h-10 w-full shrink-0 items-center border-b-1 border-stroke md:flex">
        <div className="p-4">
          <StarIcon />
        </div>

        <div className="h-8 border-r border-stroke" />

        <FavoritePairs
          pairs={favoritePairs}
          selected={selectedPairIndex}
          onSelect={onChangePairIndex}
        />
      </div>
      <div className="flex w-full items-center justify-between overflow-hidden border-b-1 border-stroke py-3 md:justify-start">
        <Popover radius="none" backdrop="opaque" placement="bottom-start">
          <PopoverTrigger>
            <Button variant="light" className="flex-shrink-0">
              {selectedPair && (
                <PairIcon
                  from={selectedPair.from}
                  to={selectedPair.to}
                  height={24}
                  width={24}
                />
              )}
              <div className="text-xl font-bold text-white">
                {selectedPair?.name}
              </div>
              <TriangleIcon
                fill="#a1a1a1"
                className="cursor-pointer"
                height={16}
                width={16}
              />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="flex max-h-[calc(100vh-150px)] w-[350px] flex-col border border-stroke bg-tizz-background px-0 py-4">
            <div className="h-[137px] w-full border-b border-stroke p-2">
              <Input
                type="text"
                placeholder="Search"
                labelPlacement="outside"
                fullWidth
                radius="none"
                variant="bordered"
                startContent={<SearchIcon className="text-6 text-gray-400" />}
                classNames={{
                  base: "border border-stroke bg-[#0E0E12] placeholder-[#e2e2e2] placeholder-opacity-40 outline-none focus:border focus:border-[#283552]",
                }}
                value={strFilter}
                onChange={handleChangeStrFilter}
              />
              <div className="text-sx flex flex-wrap gap-1 p-1 text-gray-400">
                <Button
                  variant="bordered"
                  size="sm"
                  radius="none"
                  color={groupIndex === null ? "primary" : "default"}
                  className="capitalize"
                  disableRipple
                  onClick={() => setGroupIndex(null)}
                >
                  {`All (${validPairs.length})`}
                </Button>
                {groupFilters.map((group) => (
                  <Button
                    key={group.groupIndex}
                    variant="bordered"
                    size="sm"
                    radius="none"
                    color={
                      groupIndex === group.groupIndex ? "primary" : "default"
                    }
                    className="capitalize"
                    onClick={() => setGroupIndex(group.groupIndex)}
                    disableRipple
                  >
                    {`${group.label} (${group.counts})`}
                  </Button>
                ))}
              </div>
            </div>

            <div className="h-full w-full overflow-auto">
              {filteredPairs.map((pair) => (
                <PairInfoMenuItem
                  key={pair.pairIndex}
                  id={pair.pairIndex}
                  name={pair.name}
                  from={pair.from}
                  to={pair.to}
                  description={pair.description}
                  price={pair.price}
                  percentage={pair.percentage}
                  isFavoritePair={favoritePairIndexs.includes(pair.pairIndex)}
                  onSelectFavoritePair={onSelectFavorite}
                  selectedPairIndex={selectedPairIndex}
                  onChangePairIndex={onChangePairIndex}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Divider orientation="vertical" />

        <div className="border-stroke pr-6">
          <PriceInfo
            price={
              selectedPair && selectedPair.price !== null
                ? selectedPair.price
                : null
            }
            percentage={
              selectedPair && selectedPair.percentage !== null
                ? selectedPair.percentage
                : null
            }
          />
        </div>

        <div className="hidden w-full md:block">
          {selectedPair && (
            <PairInfoBar
              openInterest={openInterest}
              selectedPair={selectedPair}
              nextFundingFeeApplyTime={nextFundingFeeApplyTime}
            />
          )}
        </div>
      </div>
    </>
  );
}
