"use client";

import { useGetGuilds } from "@/tizz-trade-hooks/guild/useGetGuilds";
import { useTranslations } from "next-intl";

import TeamWinnerCard from "./TeamWinnerCard";
import TeamWinnerCardSkeleton from "./skeletons/TeamWinnerCardSkeleton";

export default function TeamWinners() {
  const t = useTranslations("Trade-TeamWinners");

  const { data, isSuccess, isFetching } = useGetGuilds();

  if (isFetching) {
    return (
      <div className="flex flex-col gap-6">
        <div className="text-2xl font-semibold leading-[38px] text-white md:text-3xl">
          {t("winners-team")}
        </div>
        <div className="flex w-full gap-6 overflow-auto">
          {Array.from(Array(3).keys()).map((item) => (
            <TeamWinnerCardSkeleton key={item} rank={item} />
          ))}
        </div>
      </div>
    );
  }

  if (!data || !isSuccess || data.slice(0, 3).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-2xl font-semibold leading-[38px] text-white md:text-3xl">
        {t("winners-team")}
      </div>
      <div className="flex w-full gap-6 overflow-auto">
        {data &&
          isSuccess &&
          data
            .slice(0, 3)
            .map((item) => <TeamWinnerCard key={item.guild_id} guild={item} />)}

        {!data &&
          isFetching &&
          Array.from(Array(3).keys()).map((item) => (
            <TeamWinnerCardSkeleton key={item} rank={item} />
          ))}
      </div>
    </div>
  );
}
