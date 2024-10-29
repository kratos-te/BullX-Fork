"use client";

import { useState, useMemo, Key } from "react";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";
import { twMerge } from "tailwind-merge";

import BorderedInput from "@/components/inputs/BorderedInput/BorderedInput";
import DataTable, { TableColumnProps } from "@/components/tables/DataTableV2";
import SearchIcon from "@/components/icons/SearchIcon";
import BaseTabs, { TabItem } from "@/components/tabs/BaseTabs/BaseTabs";

import { useGetUsers } from "@/tizz-trade-hooks/guild/useGetUsers";
import { useGetUser } from "@/tizz-trade-hooks/guild/useGetUser";
import { useGetGuilds } from "@/tizz-trade-hooks/guild/useGetGuilds";

import { getPriceStr } from "@/utils/price";

import { getMedal, formatWalletAddress } from "@/utils/index";

export default function TeamLeaderboard() {
  const t = useTranslations("Trade-TeamLeaderboard");

  const bigTabItems: TabItem[] = [
    {
      id: "user",
      label: t("user"),
    },
    {
      id: "team",
      label: t("team"),
    },
  ];

  const userColumns: TableColumnProps[] = [
    {
      id: "rank",
      component: t("rank"),
    },
    {
      id: "walletAddress",
      component: t("wallet-address"),
    },
    { id: "trades", component: t("trades") },
    { id: "winrate", component: t("winrate") },
    { id: "pnl", component: "PnL($)" },
  ];

  const teamColumns: TableColumnProps[] = [
    {
      id: "rank",
      component: t("rank"),
    },
    {
      id: "teamName",
      component: t("team-name"),
    },
    { id: "trades", component: t("trades") },
    { id: "winrate", component: t("winrate") },
    { id: "pnl", component: "PnL($)" },
  ];

  const [filter, setFilter] = useState("");
  // const [pendingId, setPendingId] = useState<number | null>(null);
  const [selectedTabKey, setSelectedTabKey] = useState<string>(
    bigTabItems[0].id,
  );

  const account = useAccount();

  const guildsQuery = useGetGuilds();
  const usersQuery = useGetUsers();
  const userQuery = useGetUser();

  const handleBaseTabSelectionChange = (value: Key) => {
    setSelectedTabKey(value as string);
  };

  const userRows = useMemo(() => {
    if (!usersQuery.data || !usersQuery.isSuccess || !account.address) {
      return [];
    }

    const usersData = usersQuery.data.filter(
      (item) => item.GeneralTradingActivity.length > 0,
    );

    const userRow = usersData.find(
      (user) => user.wallet_address === userQuery.data?.wallet_address,
    );

    const rows = [userRow, ...usersData];

    return rows.map((user, index) => {
      if (user) {
        return {
          id: index === 0 ? `${user.id}-0` : `${user.id}`,
          className: index === 0 ? "bg-white/5" : undefined,
          data: {
            rank: {
              component: (
                <p
                  className={twMerge(
                    "text-lg",
                    index === 0 ? "text-amber-300" : "text-neutral-200",
                  )}
                >
                  {index === 0
                    ? `You (Rank: ${getMedal(user.rank)})`
                    : getMedal(user.rank)}
                </p>
              ),
            },
            walletAddress: {
              component: (
                <p className="text-lg text-neutral-200">
                  {formatWalletAddress(user.wallet_address)}
                </p>
              ),
            },
            trades: {
              component: (
                <p className="text-lg text-zinc-400">
                  {user.GeneralTradingActivity.length}
                </p>
              ),
            },
            winrate: {
              component: (
                <p className="text-lg text-emerald-400">
                  {user.GeneralTradingActivity.length > 0
                    ? `${(
                        (user.totalOverAllWins * 100) /
                        user.GeneralTradingActivity.length
                      ).toFixed(2)}%`
                    : "-"}
                </p>
              ),
            },
            pnl: {
              component: (
                <p className="text-lg text-indigo-400">
                  ${getPriceStr(user.totalOverallPnL)}
                </p>
              ),
            },
          },
        };
      } else {
        return {
          id: index === 0 ? "none-0" : "none",
          className: index === 0 ? "bg-white/5" : undefined,
          data: {
            rank: {
              component: (
                <p
                  className={twMerge(
                    "text-lg",
                    index === 0 ? "text-amber-300" : "text-neutral-200",
                  )}
                >
                  {index === 0 ? `You (Rank: NA})` : "NA"}
                </p>
              ),
            },
            walletAddress: {
              component: <p className="text-lg text-neutral-200">-</p>,
            },
            trades: {
              component: <p className="text-lg text-zinc-400">-</p>,
            },
            winrate: {
              component: <p className="text-lg text-emerald-400">-</p>,
            },
            pnl: {
              component: <p className="text-lg text-indigo-400">-</p>,
            },
          },
        };
      }
    });
  }, [
    account.address,
    userQuery.data?.wallet_address,
    usersQuery.data,
    usersQuery.isSuccess,
  ]);

  const guildsRows = useMemo(() => {
    if (!guildsQuery.data || !guildsQuery.isSuccess) {
      return [];
    }

    const guildsData = guildsQuery.data.filter(
      (guild) => guild.totalTrades > 0,
    );

    const guildRow = guildsData.find(
      (guild) =>
        userQuery.data &&
        guild.guildMembers
          .map((member) => member.user_id)
          .includes(userQuery.data.id),
    );

    const rows = [guildRow, ...guildsData];

    return rows.map((guild, index) => {
      if (guild) {
        return {
          id: index === 0 ? `${guild.guild_id}-0` : `${guild.guild_id}`,
          className: index === 0 ? "bg-white/5" : undefined,
          data: {
            rank: {
              component: (
                <p
                  className={twMerge(
                    "text-lg",
                    index === 0 ? "text-amber-300" : "text-neutral-200",
                  )}
                >
                  {index === 0
                    ? `Your Team (Rank: ${getMedal(guild.rank)})`
                    : getMedal(guild.rank)}
                </p>
              ),
            },
            teamName: {
              component: (
                <p className="text-lg text-neutral-200">{guild.name}</p>
              ),
            },
            trades: {
              component: (
                <p className="text-lg text-zinc-400">{guild.totalTrades}</p>
              ),
            },
            winrate: {
              component: (
                <p className="text-lg text-emerald-400">
                  {guild.totalTrades
                    ? `${((guild.totalOverAllWins * 100) / guild.totalTrades).toFixed(2)}%`
                    : "-"}
                </p>
              ),
            },
            pnl: {
              component: (
                <p className="text-lg text-indigo-400">
                  ${getPriceStr(guild.totalOverAllPnL)}
                </p>
              ),
            },
          },
        };
      } else {
        return {
          id: index === 0 ? "none-0" : "none",
          className: index === 0 ? "bg-white/5" : undefined,
          data: {
            rank: {
              component: (
                <p
                  className={twMerge(
                    "text-lg",
                    index === 0 ? "text-amber-300" : "text-neutral-200",
                  )}
                >
                  {index === 0 ? `Your Team (Rank: NA)` : "NA"}
                </p>
              ),
            },
            teamName: {
              component: <p className="text-lg text-neutral-200">-</p>,
            },
            trades: {
              component: <p className="text-lg text-zinc-400">-</p>,
            },
            winrate: {
              component: <p className="text-lg text-emerald-400">-</p>,
            },
            pnl: {
              component: <p className="text-lg text-indigo-400">-</p>,
            },
          },
        };
      }
    });
  }, [guildsQuery.data, guildsQuery.isSuccess, userQuery.data]);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-semibold leading-[38px] text-white md:text-3xl">
        {t("leaderboard")}
      </p>

      <div className="flex items-center justify-between">
        <BorderedInput
          type="text"
          placeholder={t("search")}
          labelPlacement="outside"
          required
          value={filter}
          onValueChange={setFilter}
          startContent={
            <SearchIcon width={20} height={20} className="text-gray-400" />
          }
          classNames={{
            base: "bg-neutral-900 w-[100px] md:w-[280px]",
            input: "text-sm",
          }}
        />

        <BaseTabs
          variant="bordered"
          tabs={bigTabItems}
          selectedKey={selectedTabKey}
          onSelectionChange={handleBaseTabSelectionChange}
          classNames={{
            base: "w-fit",
            tab: "w-[100px]",
            cursor: "!bg-neutral-800 !rounded-md !border-zinc-800",
            tabList: "rounded !border-neutral-800 p-1 gap-0 border-[1px]",
            tabContent:
              "text-sm text-gray-400 p-1 group-data-[selected=true]:text-white",
          }}
        />
      </div>

      {selectedTabKey === "user" ? (
        <DataTable
          columns={userColumns}
          rows={userRows}
          classNames={{
            wrapper: "rounded-lg border border-gray-800",
            th: "py-[12px] bg-neutral-900 !rounded-none text-sm !text-neutral-200",
          }}
        />
      ) : (
        <DataTable
          columns={teamColumns}
          rows={guildsRows}
          classNames={{
            wrapper: "rounded-lg border border-gray-800",
            th: "py-[12px] bg-neutral-900 !rounded-none text-sm !text-neutral-200",
          }}
        />
      )}
    </div>
  );
}
