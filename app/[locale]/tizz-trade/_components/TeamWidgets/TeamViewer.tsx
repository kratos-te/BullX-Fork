"use client";

import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

import UsersIcon from "@/components/icons/UsersIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import BorderedInput from "@/components/inputs/BorderedInput/BorderedInput";

import { useGetGuilds } from "@/tizz-trade-hooks/guild/useGetGuilds";

import TeamCard from "./TeamCard";
import TeamCardSkeleton from "./skeletons/TeamCardSkeleton";

export default function TeamViewer() {
  const t = useTranslations("Trade-TeamViewer");

  const { data, isSuccess, isFetching } = useGetGuilds();

  const [filter, setFilter] = useState("");

  const filteredTeams = useMemo(() => {
    if (!data || !isSuccess) {
      return [];
    }

    return data.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [data, filter, isSuccess]);

  return (
    <BaseCard
      classNames={{
        base: "p-3 md:p-[18px] bg-neutral-900",
      }}
    >
      <div className="flex w-full flex-col gap-3.5">
        <div className="flex items-center gap-3.5">
          <UsersIcon
            fill="#F4CD8C"
            className="h-6 w-6 rounded-md border-1 border-stroke bg-neutral-800 p-1 md:h-8 md:w-8"
          />
          <div
            className={twMerge(
              "font-semibold leading-loose text-white",
              "text-lg sm:text-lg md:text-2xl",
            )}
          >
            {t("teams")}
          </div>
        </div>

        <BorderedInput
          type="text"
          placeholder={t("search-for-team")}
          labelPlacement="outside"
          required
          value={filter}
          onValueChange={setFilter}
          startContent={
            <SearchIcon width={20} height={20} className="text-gray-400" />
          }
          fullWidth
          classNames={{
            base: "bg-neutral-900",
            input: "text-sm",
          }}
        />

        <div className="flex max-h-[355px] flex-col gap-3.5 overflow-auto">
          {filteredTeams.map((data) => (
            <TeamCard key={data.guild_id} guild={data} />
          ))}

          {isFetching &&
            Array.from(Array(5).keys()).map((item) => (
              <TeamCardSkeleton key={item} />
            ))}
        </div>
      </div>
    </BaseCard>
  );
}
