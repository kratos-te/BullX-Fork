"use client";

import { useMemo } from "react";

import DataTable, { TableColumnProps } from "@/components/tables/DataTableV2";

import { useGetUsers } from "@/tizz-trade-hooks/guild/useGetUsers";
import { useGetUser } from "@/tizz-trade-hooks/guild/useGetUser";

import { twMerge } from "tailwind-merge";
import { useAccount } from "wagmi";

import { getMedal, formatWalletAddress } from "@/utils/index";

export default function LeaderboardTab() {
  const columns: TableColumnProps[] = [
    {
      id: "rank",
      component: "Rank",
    },
    {
      id: "walletAddress",
      component: "Address",
    },
    { id: "winrate", component: "Winrate" },
    { id: "roundsPlayed", component: "Rounds Played" },
    { id: "roundsWon", component: "Rounds Won" },
    { id: "earned", component: "Total Earned" },
  ];

  const account = useAccount();

  const usersQuery = useGetUsers();
  const userQuery = useGetUser();

  const rows = useMemo(() => {
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
                    "text-sm",
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
                <p className="text-sm text-neutral-200">
                  {formatWalletAddress(user.wallet_address)}
                </p>
              ),
            },
            winrate: {
              component: (
                <p className="text-sm text-emerald-400">
                  {user.GeneralTradingActivity.length > 0
                    ? `${(
                        (user.totalOverAllWins * 100) /
                        user.GeneralTradingActivity.length
                      ).toFixed(2)}%`
                    : "-"}
                </p>
              ),
            },
            roundsPlayed: {
              component: <p className="text-sm text-white">0</p>,
            },
            roundsWon: {
              component: <p className="text-sm text-emerald-400">0</p>,
            },
            earned: {
              component: <p className="text-sm text-[#839bec]">263374</p>,
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
                    "text-sm",
                    index === 0 ? "text-amber-300" : "text-neutral-200",
                  )}
                >
                  {index === 0 ? `You (Rank: NA})` : "NA"}
                </p>
              ),
            },
            walletAddress: {
              component: <p className="text-sm text-white">-</p>,
            },
            winrate: {
              component: <p className="text-sm text-emerald-400">-</p>,
            },
            roundsPlayed: {
              component: <p className="text-sm text-white">0</p>,
            },
            roundsWon: {
              component: <p className="text-sm text-emerald-400">0</p>,
            },
            earned: {
              component: <p className="text-sm text-[#839bec]">263374</p>,
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

  return (
    <div className="flex flex-col gap-6">
      <DataTable
        columns={columns}
        rows={rows}
        classNames={{
          wrapper: "rounded-lg border border-gray-800",
          th: "py-[12px] bg-neutral-900 !rounded-none text-sm !text-neutral-200",
        }}
      />
    </div>
  );
}
