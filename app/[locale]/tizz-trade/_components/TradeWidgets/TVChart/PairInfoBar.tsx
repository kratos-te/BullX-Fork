"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import { OpenInterest } from "@gainsnetwork/sdk";
import { useTranslations } from "next-intl";
import { Address } from "viem";
import { useReadContract } from "wagmi";

import { useTradeState } from "@/tizz-trade-hooks/useTradeState";
import PairStatus from "./PairStatus";

import NavArrowLeftIcon from "@/components/icons/NavArrowLeftIcon";
import NavArrowRightIcon from "@/components/icons/NavArrowRightIcon";

import { formatNumber, getPercentageStr } from "@/utils/price";
import { PairWithPriceInfo } from "./FavoritePairs";
import { tizzContractAddresses } from "@/utils/tizz";
import { TizzFundingFeesAbi } from "@/abis/Tizz/TizzFundingFees";

const secToMill = 1000;
const minToMill = 60 * secToMill;
const hourToMill = 60 * minToMill;

function getRemainTimeStr(remain: number) {
  const sign = remain < 0 ? -1 : 1;

  const hours = Math.floor((remain * sign) / hourToMill);
  const minutes = Math.floor((remain * sign - hours * hourToMill) / minToMill);
  const seconds = Math.floor(
    (remain * sign - hours * hourToMill - minutes * minToMill) / secToMill,
  );

  return `${sign === -1 ? "-" : ""}${hours}:${minutes}:${seconds}`;
}

export type PairInfoBarProps = {
  openInterest: OpenInterest;
  selectedPair: PairWithPriceInfo;
  nextFundingFeeApplyTime: number;
};

export default function PairInfoBar({
  openInterest,
  selectedPair,
  nextFundingFeeApplyTime,
}: PairInfoBarProps) {
  const t = useTranslations("Trade-PairInfoBar");

  const { tradeState } = useTradeState();

  const ref = useRef<HTMLDivElement>(null);

  const [overflowed, setOverflowed] = useState(false);

  const { data: fundingRate } = useReadContract({
    address: tizzContractAddresses[tradeState.collateralType]
      .FundingFees as Address,
    abi: TizzFundingFeesAbi,
    functionName: "getFundingFees",
    args: selectedPair ? [BigInt(selectedPair.pairIndex)] : undefined,
  });

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

  const pairInfos = [
    {
      label: t("open-interest-l"),
      content: `${formatNumber(openInterest?.long)} / ${formatNumber(openInterest?.max)} ${tradeState.collateralType}`,
      contentClassName: "text-zinc-200",
      tooltip: `Sum of open ${selectedPair?.name} long position`,
    },
    {
      label: t("open-interest-s"),
      content: `${formatNumber(openInterest?.short)} / ${formatNumber(openInterest?.max)} ${tradeState.collateralType}`,
      contentClassName: "text-zinc-200",
      tooltip: `Sum of open ${selectedPair?.name} short position`,
    },
    {
      label: "Funding / Countdown",
      content:
        fundingRate !== undefined
          ? `${getPercentageStr(Number(fundingRate[1]) / 1e4)}%`
          : "-",
      contentClassName:
        fundingRate !== undefined && Number(fundingRate[1]) >= 0
          ? "text-emerald-400"
          : "text-red-400",
      tooltip:
        "Funding Fee (long) hourly rate, charged per block on the posiiton size.",
      extraContent: getRemainTimeStr(
        nextFundingFeeApplyTime - new Date().getTime(),
      ),
      extraContentClassName:
        nextFundingFeeApplyTime - new Date().getTime() < 0
          ? "text-indigo-500"
          : "text-white",
    },
  ];

  return (
    <div className="relative w-full items-center border-t-1 border-stroke px-0 py-3 md:flex md:border-t-0 md:px-8">
      {overflowed ? (
        <>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="absolute left-0 hidden md:block"
            onClick={handleClickMoveLeft}
          >
            <NavArrowLeftIcon className="text-gray-400" />
          </Button>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="absolute right-0 hidden md:block"
            onClick={handleClickMoveRight}
          >
            <NavArrowRightIcon className="text-gray-400" />
          </Button>
        </>
      ) : null}
      <div
        className="flex flex-wrap items-center justify-between overflow-hidden md:w-[calc(100%-20px)] md:flex-nowrap md:justify-start"
        ref={ref}
      >
        {pairInfos.map((pair) => (
          <Fragment key={pair.label}>
            <Divider orientation="vertical" className="hidden h-8 md:block" />

            <PairStatus
              label={pair.label}
              content={pair.content}
              contentClassName={pair.contentClassName}
              tooltip={pair.tooltip}
              extraContent={pair.extraContent}
              extraContentClassName={pair.extraContentClassName}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
