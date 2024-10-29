"use client";

import { useMemo, useState, Key } from "react";
import { useAccount, useChainId } from "wagmi";
import { Address } from "viem";

import { useTradingHistories } from "@/tizz-trade-hooks/useTradingHistories";
import { useGetUser } from "@/tizz-trade-hooks/guild/useGetUser";
import { useGetGuildById } from "@/tizz-trade-hooks/guild/useGetGuildById";
import { useTranslations } from "next-intl";

import PortfolioAccountPanel from "@/tizz-trade-components/Portfolio/PortfolioAccountPanel";
import PortfolioPNLPanel from "@/tizz-trade-components/Portfolio/PortfolioPNLPanel";
import PortfolioStatePanel from "@/tizz-trade-components/Portfolio/PortfolioStatePanel";
import HistoriesPanel from "@/tizz-trade-components/TradeWidgets/TradeControlPanel/HistoriesPanel";
import BaseSwitch from "@/components/switchs/BaseSwitch/BaseSwitch";

const limitByRange: Record<string, number | null> = {
  "24h": 24 * 60 * 60 * 1000,
  "1w": 7 * 24 * 60 * 60 * 1000,
  "1m": 30 * 24 * 60 * 60 * 1000,
  "3m": 3 * 30 * 24 * 60 * 60 * 1000,
  all: null,
};

export default function PortfolioPage() {
  const t = useTranslations("Trade-PortfolioPage");

  const chainId = useChainId();
  const account = useAccount();

  const { data: userData, isFetching: isFetchingUserData } = useGetUser();
  const { data: guildData, isFetching: isFetchingGuildData } = useGetGuildById(
    userData && userData.guildMembers?.length > 0
      ? userData.guildMembers[0].guild.guild_id
      : undefined,
  );

  const {
    data: tradingHistoriesData,
    isFetching: isFetctingTradeHistoriesData,
  } = useTradingHistories(
    chainId,
    guildData && guildData.guildMembers
      ? guildData.guildMembers.map((member) => member.wallet_address as Address)
      : account.address
        ? [account.address]
        : [],
  );

  const [rangeStr, setRangeStr] = useState<string>("all");
  const [isTeamView, setIsTeamView] = useState<boolean>(false);
  const [isShowAll, setIsShowAll] = useState(false);

  const handleRangeSelectionChange = (value: Key) => {
    setRangeStr(value as string);
  };

  const allHistories = useMemo(() => {
    if (!tradingHistoriesData) {
      return [];
    }

    return tradingHistoriesData
      .filter((history) => {
        if (limitByRange[rangeStr] === null) {
          return true;
        }

        return (
          new Date(history.date).getTime() >
          new Date().getTime() - limitByRange[rangeStr]!
        );
      })
      .sort((a, b) => {
        if (new Date(a.date) > new Date(b.date)) {
          return -1;
        } else if (new Date(a.date) < new Date(b.date)) {
          return 1;
        } else {
          return 0;
        }
      });
  }, [rangeStr, tradingHistoriesData]);

  const isFetching =
    isFetchingUserData || isFetchingGuildData || isFetctingTradeHistoriesData;

  return (
    <div className="flex w-full flex-col gap-6 p-[10px] md:gap-3.5 2xl:w-[1536px]">
      <div className="flex w-full flex-col gap-8 md:flex md:flex-row md:gap-3.5">
        <PortfolioAccountPanel
          tradeHistories={allHistories}
          isFetching={isFetching}
        />
        <PortfolioPNLPanel
          rangeStr={rangeStr}
          isTeamView={isTeamView}
          onChangeViewMode={setIsTeamView}
          onRangeSelectionChange={handleRangeSelectionChange}
          tradeHistories={allHistories}
          isFetching={isFetching}
        />
      </div>

      <PortfolioStatePanel isFetching={isFetching} />

      <h6 className="w-fit text-2xl font-semibold leading-loose text-white">
        {t("history")}
      </h6>

      <BaseSwitch
        label="Show All"
        isSelected={isShowAll}
        setIsSelected={setIsShowAll}
        classNames={{
          wrapper: "justify-end w-full",
        }}
      />

      <HistoriesPanel
        histories={allHistories}
        isTeamView={isTeamView}
        isShowAll={isShowAll}
        classNames={{ wrapper: "border border-stroke rounded-xl" }}
      />
    </div>
  );
}
