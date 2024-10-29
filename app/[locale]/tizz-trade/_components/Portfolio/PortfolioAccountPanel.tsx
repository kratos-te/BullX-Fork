"use client";

import { useMemo } from "react";
import { Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";

import UserIcon from "@/components/icons/UserIcon";
import IconButton from "@/components/buttons/IconButton/IconButton";
import { TradeHistoryRecord } from "@/types/index";

import { getPercentageStr, getPriceStr } from "@/utils/price";

export type PortfolioAccountPanelProps = {
  tradeHistories: TradeHistoryRecord[];
  isFetching: boolean;
};

export default function PortfolioAccountPanel({
  tradeHistories,
  isFetching,
}: PortfolioAccountPanelProps) {
  const t = useTranslations("Trade-PortfolioAccountPanel");

  const account = useAccount();

  const tradeStates = useMemo(() => {
    const user = {
      wins: 0,
      winsPnl: 0,
      losses: 0,
      lossesPnl: 0,
    };
    const team = {
      wins: 0,
      winsPnl: 0,
      losses: 0,
      lossesPnl: 0,
    };

    tradeHistories.forEach((history) => {
      if (history.address === account.address) {
        if (history.pnl_net > 0) {
          user.wins++;
          user.winsPnl += history.pnl_net * history.collateralPriceUsd;
        } else {
          user.losses++;
          user.lossesPnl += history.pnl_net * history.collateralPriceUsd;
        }
      }

      if (history.pnl_net > 0) {
        team.wins++;
        team.winsPnl += history.pnl_net * history.collateralPriceUsd;
      } else {
        team.losses++;
        team.lossesPnl += history.pnl_net * history.collateralPriceUsd;
      }
    });

    return [
      {
        id: "trades",
        user: {
          label: t("your-trades"),
          value: user.wins + user.losses,
        },
        team: {
          label: t("team-trades"),
          value: team.wins + team.losses,
        },
      },
      {
        id: "winrate",
        user: {
          label: t("winrate"),
          value:
            user.wins + user.losses
              ? `${getPercentageStr((user.wins * 100) / (user.wins + user.losses))}%`
              : "--",
        },
        team: {
          label: t("team-winrate"),
          value:
            team.wins + team.losses
              ? `${getPercentageStr((team.wins * 100) / (team.wins + team.losses))}%`
              : "--",
        },
      },
      {
        id: "avgProfit",
        user: {
          label: t("avg-profit"),
          value: user.wins ? `$${getPriceStr(user.winsPnl / user.wins)}` : "--",
        },
        team: {
          label: t("team-avg-profit"),
          value: team.wins ? `$${getPriceStr(team.winsPnl / team.wins)}` : "--",
        },
      },
      {
        id: "avgLoss",
        user: {
          label: t("avg-loss"),
          value:
            user.lossesPnl < 0
              ? user.losses
                ? `-$${getPriceStr((user.lossesPnl * -1) / user.losses)}`
                : "--"
              : "0",
        },
        team: {
          label: t("team-avg-loss"),
          value:
            team.lossesPnl < 0
              ? team.losses
                ? `-$${getPriceStr((team.lossesPnl * -1) / team.losses)}`
                : "--"
              : "0",
        },
      },
    ];
  }, [t, tradeHistories, account]);

  return (
    <div
      className={twMerge(
        "flex w-full flex-col items-start justify-start gap-3.5 rounded-md border border-gray-800 bg-neutral-900",
        "col-span-2 p-[10px] md:col-span-2 md:w-[380px] md:p-[18px]",
      )}
    >
      <div className="flex items-center gap-3.5">
        <IconButton
          className={twMerge(
            "flex items-center justify-center gap-2.5 rounded-md !border-1 !border-gray-800 bg-neutral-800",
            "h-[24px] w-[24px] p-0 md:h-10 md:w-10 md:p-2",
          )}
        >
          <UserIcon
            width={15}
            height={15}
            fill="#F4CD8C"
            className="block md:hidden"
          />
          <UserIcon
            width={24}
            height={24}
            fill="#F4CD8C"
            className="hidden md:block"
          />
        </IconButton>
        <div className="text-lg font-semibold leading-loose text-white md:text-2xl lg:text-2xl xl:text-2xl">
          {t("account")}
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 md:flex">
        {tradeStates.map((state) => (
          <div
            key={state.id}
            className="flex h-[105px] w-full items-center justify-center gap-8 rounded-md border border-gray-800 bg-neutral-800 p-3.5"
          >
            <div className="items-centerflex h-[60px] w-[129px] flex-1 grow flex-col gap-[5px] text-white ">
              <div className="w-full text-base font-semibold">
                {state.user.label}
              </div>
              <div className="text-xl font-bold">
                {isFetching ? (
                  <Skeleton className="h-8 w-[100px] rounded-lg" />
                ) : (
                  state.user.value
                )}
              </div>
            </div>
            <div className="h-[54px] w-[1px] bg-gray-800" />
            <div className="flex h-[60px] w-[129px] flex-1 grow flex-col items-start gap-[5px] text-slate-300">
              <div className="w-full text-base font-semibold">
                {state.team.label}
              </div>
              <div className="text-sx font-bold">
                {isFetching ? (
                  <Skeleton className="h-8 w-[100px] rounded-lg" />
                ) : (
                  state.team.value
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
