"use client";

import { useMemo } from "react";
import { useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import Button from "@/components/buttons/Button/Button";

import { useGetJoinRequests } from "@/tizz-trade-hooks/guild/useGetJoinRequests";

import TeamJoinCardSkeleton from "./skeletons/TeamJoinCardSkeleton";
import TeamJoinRequestModal from "./modals/TeamJoinRequestModal";

export type TeamJoinCardProps = {
  guildId: number;
};

export default function TeamJoinCard({ guildId }: TeamJoinCardProps) {
  const t = useTranslations("Trade-TeamJoinCard");

  const { data, isSuccess, isFetching } = useGetJoinRequests(guildId);

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const rows = useMemo(() => {
    if (!data || !isSuccess) {
      return [];
    }

    return data.filter((item) => item.status === "PENDING");
  }, [data, isSuccess]);

  if (isFetching) {
    return <TeamJoinCardSkeleton />;
  }

  if (!data || !isSuccess) {
    return null;
  }

  return (
    <>
      <BaseCard
        classNames={{
          base: "p-3 md:p-6 bg-neutral-900 gap-3 md:gap-6 border-yellow-800 md:border-stroke",
        }}
      >
        <p className="text-lg font-semibold leading-7 text-amber-300">
          {t("you-have-team-members-request")}
        </p>

        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
          <p className="text-2xl leading-7 text-white md:text-lg">
            {t("team-request")}:
          </p>
          <h6 className="text-[32px] font-black text-white md:text-4xl md:font-semibold">
            {rows.length}
          </h6>
        </div>

        <Button
          onClick={onOpen}
          className="w-full bg-amber-300 px-4 py-2.5 text-sm text-black md:w-fit"
        >
          {t("see-request")}
        </Button>
      </BaseCard>
      <TeamJoinRequestModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        joinActions={rows}
      />
    </>
  );
}
