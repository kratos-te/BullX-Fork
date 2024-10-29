"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Modal, ModalContent, ModalBody, Spinner } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { useMedia } from "react-use";
import { useTranslations } from "next-intl";

import ChevronDown from "@/components/icons/ChevronDown";
import Button from "@/components/buttons/Button/Button";
import BorderedInput from "@/components/inputs/BorderedInput/BorderedInput";
import SearchIcon from "@/components/icons/SearchIcon";
import BaseCard from "@/components/cards/BaseCard/BaseCard";
import DataTable, {
  TableColumnProps,
  TableRowProps,
} from "@/components/tables/DataTableV2";

import {
  IGuildMembershipAction,
  IGuildUserWithAggregation,
} from "@/types/index";

import teamMascortSrc from "@/assets/images/zentoshi/tizz-mascot-profile.svg";

import { useGetUsers } from "@/tizz-trade-hooks/guild/useGetUsers";
import { useGuild } from "@/tizz-trade-hooks/guild/useGuild";

const formatWalletAddress = (address: string) => {
  if (address.length < 10) {
    return address;
  }

  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4, address.length);
  return `${start}.....${end}`;
};

export type TeamJoinRequestModalProps = {
  isOpen: boolean;
  onOpenChange(): void;
  joinActions: IGuildMembershipAction[];
};

export default function TeamJoinRequestModal({
  isOpen,
  onOpenChange,
  joinActions,
}: TeamJoinRequestModalProps) {
  const isMobile = useMedia("(max-width: 550px)");

  const t = useTranslations("Trade-TeamJoinRequestModal");

  const usersQuery = useGetUsers();
  const { denyJoinMutation, acceptJoinMutation } = useGuild();

  const [approvePendingIds, setApprovePendingIds] = useState<number[]>([]);
  const [denyPendingIds, setDenyPendingIds] = useState<number[]>([]);

  const [filter, setFilter] = useState("");

  const handleApprove = useCallback(
    (action: IGuildMembershipAction) => {
      setApprovePendingIds((prev) => [
        ...prev.filter((item) => item !== action.action_id),
        action.action_id,
      ]);
      acceptJoinMutation.mutate(
        { action },
        {
          onSuccess: () => {
            setApprovePendingIds((prev) => [
              ...prev.filter((item) => item !== action.action_id),
            ]);
          },
        },
      );
    },
    [acceptJoinMutation],
  );

  const handleApproveAll = () => {
    joinActions.forEach((action) => {
      handleApprove(action);
    });
  };

  const handleDeny = useCallback(
    (action: IGuildMembershipAction) => {
      setDenyPendingIds((prev) => [
        ...prev.filter((item) => item !== action.action_id),
        action.action_id,
      ]);
      denyJoinMutation.mutate(
        { action },
        {
          onSuccess: () => {
            setDenyPendingIds((prev) => [
              ...prev.filter((item) => item !== action.action_id),
            ]);
          },
        },
      );
    },
    [denyJoinMutation],
  );

  const columns: TableColumnProps[] = useMemo(
    () =>
      isMobile
        ? [
            { id: "name", component: t("name") },
            { id: "actions", component: t("actions") },
          ]
        : [
            { id: "name", component: t("name") },
            { id: "walletAddress", component: t("wallet-address") },
            { id: "date", component: t("date") },
            { id: "time", component: t("time") },
            { id: "actions", component: t("actions") },
          ],
    [isMobile, t],
  );

  const rows = useMemo(() => {
    if (!usersQuery.data || !usersQuery.isSuccess) {
      return [];
    }

    const usersMap = new Map<number, IGuildUserWithAggregation>();

    usersQuery.data.map((user) => usersMap.set(user.id, user));

    return joinActions
      .map((action) => {
        const user = usersMap.get(action.user_id);

        const dateStr = dayjs(action.created_at).format("YYYY-MM-DD");
        const timeStr = dayjs(action.created_at).format("hh-mm A");

        if (!user) {
          return null;
        }

        if (isMobile) {
          return {
            id: `${action.action_id}`,
            data: {
              name: {
                component: (
                  <div className="flex items-center gap-2">
                    <Image src={teamMascortSrc} alt="Avatar1" />
                    <div className="flex flex-col gap-0">
                      <p className="text-lg text-neutral-200">
                        {t("user")} #{action.user_id}
                      </p>
                      <p className="text-lg text-gray-400">
                        {formatWalletAddress(user.wallet_address)}
                      </p>
                    </div>
                  </div>
                ),
              },
              actions: {
                component: (
                  <div className="flex gap-1">
                    <Button
                      onClick={() => handleApprove(action)}
                      className="bg-amber-300 px-4 py-2.5 text-base text-black"
                    >
                      {t("approve")}
                      {approvePendingIds.includes(action.action_id) &&
                        acceptJoinMutation.isPending && (
                          <Spinner color="default" size="sm" />
                        )}
                    </Button>
                    <Button
                      onClick={() => handleDeny(action)}
                      className="bg-gray-800 px-4 py-2.5 text-base text-white"
                    >
                      {t("deny")}
                      {denyPendingIds.includes(action.action_id) &&
                        denyJoinMutation.isPending && (
                          <Spinner color="default" size="sm" />
                        )}
                    </Button>
                  </div>
                ),
              },
            },
          };
        }

        return {
          id: `${action.action_id}`,
          data: {
            name: {
              component: (
                <div className="flex items-center gap-2">
                  <Image src={teamMascortSrc} alt="Avatar1" />
                  <p className="text-lg text-neutral-200">
                    {t("user")} #{action.user_id}
                  </p>
                </div>
              ),
            },
            walletAddress: {
              component: (
                <p className="text-lg text-neutral-200">
                  {formatWalletAddress(user.wallet_address)}
                </p>
              ),
            },
            date: {
              component: <p className="text-lg text-zinc-400">{dateStr}</p>,
            },
            time: {
              component: <p className="text-lg text-zinc-400">{timeStr}</p>,
            },
            actions: {
              component: (
                <div className="flex gap-1">
                  <Button
                    onClick={() => handleApprove(action)}
                    className="bg-amber-300 px-4 py-2.5 text-base text-black"
                  >
                    {t("approve")}
                    {approvePendingIds.includes(action.action_id) &&
                      acceptJoinMutation.isPending && (
                        <Spinner color="default" size="sm" />
                      )}
                  </Button>
                  <Button
                    onClick={() => handleDeny(action)}
                    className="bg-gray-800 px-4 py-2.5 text-base text-white"
                  >
                    {t("deny")}
                    {denyPendingIds.includes(action.action_id) &&
                      denyJoinMutation.isPending && (
                        <Spinner color="default" size="sm" />
                      )}
                  </Button>
                </div>
              ),
            },
          },
        };
      })
      .filter((item) => !!item) as TableRowProps[];
  }, [
    acceptJoinMutation.isPending,
    approvePendingIds,
    denyJoinMutation.isPending,
    denyPendingIds,
    handleApprove,
    handleDeny,
    isMobile,
    joinActions,
    t,
    usersQuery.data,
    usersQuery.isSuccess,
  ]);

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={twMerge(
        "h-[80%] w-full rounded-md border border-stroke bg-neutral-950 md:h-[60%] md:max-w-[80%]",
      )}
    >
      <ModalContent>
        <ModalBody className="gap-6 p-3 pt-10 md:gap-8 md:p-6">
          <div className="flex w-full items-center justify-between">
            <BorderedInput
              type="text"
              placeholder="Search for name with code or wallet address      "
              labelPlacement="outside"
              required
              value={filter}
              onValueChange={setFilter}
              startContent={
                <SearchIcon width={20} height={20} className="text-gray-400" />
              }
              classNames={{
                base: "bg-neutral-900 w-[50px] md:w-[582px]",
                input: "text-sm",
              }}
            />

            <div className="flex w-fit items-center gap-3 md:gap-6">
              <p className="hidden text-base font-semibold text-gray-400 md:flex">
                You have {joinActions.length} member request
              </p>

              <Button
                onClick={handleApproveAll}
                className="w-fit px-3 py-1.5 text-lg font-normal text-white md:font-bold"
              >
                {t("approve-all")}
              </Button>

              <div className="flex items-center gap-2">
                <Button isIconOnly className="py-2">
                  <ChevronDown className="rotate-90 text-[24px]" />
                </Button>
                <BaseCard
                  classNames={{
                    base: "bg-neutral-800 rounded-none py-2 px-2 md:px-4 w-fit text-nowrap md:w-[100px] items-center",
                  }}
                >
                  {`1 - ${rows.length}`}
                </BaseCard>
                <Button isIconOnly className="py-2">
                  <ChevronDown className="-rotate-90 text-[24px]" />
                </Button>
              </div>
            </div>
          </div>

          <DataTable
            selectionMode="multiple"
            columns={columns}
            rows={rows}
            classNames={{
              wrapper: "rounded-lg border border-gray-800",
              th: "py-[12px] bg-neutral-800 !rounded-none text-sm !text-neutral-200",
              tbody: "[&>*:nth-child(even)]:bg-neutral-800",
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
