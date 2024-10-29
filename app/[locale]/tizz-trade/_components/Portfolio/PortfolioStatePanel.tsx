"use client";

import { useTranslations } from "next-intl";
import { Button, Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { Address } from "viem";
import { useAccount } from "wagmi";

import { useTokenBalance } from "@/tizz-trade-hooks/useTokenBalance";

import {
  CollateralTypes,
  collateralTokenIcons,
  tizzContractAddresses,
} from "@/utils/tizz";

import ValutIcon from "@/components/icons/ValutIcon";
import TokenIcon from "@/components/icons/TokenIcon";
import AwardIcon from "@/components/icons/AwardIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import IconButton from "@/components/buttons/IconButton/IconButton";
import { getPriceStr } from "@/utils/price";

type PortfolioStatePanelProps = {
  isFetching: boolean;
};

export default function PortfolioStatePanel({
  isFetching,
}: PortfolioStatePanelProps) {
  const t = useTranslations("Trade-PortfolioStatePanel");
  const account = useAccount();

  const { balance: usdtBalance, precision: usdtPrecision } = useTokenBalance({
    contractAddress: tizzContractAddresses[CollateralTypes.USDT]
      .tDAI as Address,
    ownerAddress: account.address,
  });
  const { balance: wbtcBalance, precision: wbtcPrecision } = useTokenBalance({
    contractAddress: tizzContractAddresses[CollateralTypes.WBTC]
      .tDAI as Address,
    ownerAddress: account.address,
  });

  const stateItems = [
    {
      title: t("vault"),
      icon: <ValutIcon width={32} height={32} fill="#F4CD8C" />,
      leftCom: (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-3xl font-semibold text-white">
            {isFetching ? (
              <Skeleton className="h-6 w-[50px] rounded-lg" />
            ) : wbtcBalance !== undefined && wbtcPrecision !== undefined ? (
              getPriceStr(Number(wbtcBalance) / wbtcPrecision)
            ) : (
              "-"
            )}
            <TokenIcon
              token={collateralTokenIcons[CollateralTypes.WBTC]}
              width={16}
              height={16}
            />
          </div>
          <div className="flex items-center gap-2 text-3xl font-semibold text-white">
            {isFetching ? (
              <Skeleton className="h-6 w-[50px] rounded-lg" />
            ) : usdtBalance !== undefined && usdtPrecision !== undefined ? (
              getPriceStr(Number(usdtBalance) / usdtPrecision)
            ) : (
              "-"
            )}
            <TokenIcon
              token={collateralTokenIcons[CollateralTypes.USDT]}
              width={16}
              height={16}
            />
          </div>
        </div>
      ),
      rightCom: (
        <Button className="rounded-md bg-neutral-800 px-4 py-2.5  text-xs text-gray-400">
          {t("learn-more")}
        </Button>
      ),
    },
    {
      title: t("referrals"),
      icon: <UsersIcon width={32} height={32} fill="#F4CD8C" />,
      leftCom: (
        <div className="flex items-center gap-2 text-3xl font-semibold text-white">
          0
          <TokenIcon
            token={collateralTokenIcons[CollateralTypes.WBTC]}
            width={16}
            height={16}
          />
        </div>
      ),
      rightCom: null,
    },
    {
      title: t("rewards"),
      icon: <AwardIcon width={32} height={32} fill="#F4CD8C" />,
      leftCom: (
        <div className="text-3xl font-semibold text-white">
          {isFetching ? (
            <Skeleton className="h-6 w-[50px] rounded-lg" />
          ) : (
            "0.00"
          )}
        </div>
      ),
      rightCom: (
        <Button className="rounded-md bg-neutral-800 px-4 py-2.5  text-xs text-gray-400">
          {t("learn-more")}
        </Button>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-nowrap gap-3">
      {stateItems.map((item, index) => (
        <div
          key={item.title}
          className={twMerge(
            "flex items-start justify-between gap-3.5 rounded-md border border-gray-800 bg-neutral-900 p-[10px] md:w-1/3",
            index === 1
              ? "order-last w-full md:order-none"
              : "w-[calc(50%-6px)]",
          )}
        >
          <IconButton className="h-[48px] w-[48px] rounded-md !border-1 !border-gray-800 bg-neutral-800 p-[8px]">
            {item.icon}
          </IconButton>

          <div className="w-full">
            <span className="text-base font-semibold text-slate-300">
              {item.title}
            </span>
            <div className="flex items-start justify-start gap-[24px] md:justify-between">
              {item.leftCom}

              {item.rightCom}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
