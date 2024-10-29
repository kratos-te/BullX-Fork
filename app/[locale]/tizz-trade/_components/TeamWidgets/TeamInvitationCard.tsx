"use client";

import { useEffect } from "react";
import { useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";

import teamPic from "@/assets/images/zentoshi/teamTrader.svg";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import Button from "@/components/buttons/Button/Button";

import { useGetGuildById } from "@/tizz-trade-hooks/guild/useGetGuildById";

import { IGuildMembershipAction } from "@/types/index";
import { TeamInfoItem } from "./TeamInfoItem";
import CongratulationModal from "./modals/CongratulationModal";
import { useGuild } from "@/tizz-trade-hooks/guild/useGuild";
import CustomImage from "@/components/image/CustomImage";

export type TeamInvitationCardProps = {
  action: IGuildMembershipAction;
};

export default function TeamInvitationCard({
  action,
}: TeamInvitationCardProps) {
  const t = useTranslations("Trade-TeamInvitationCard");

  const { acceptInvitationMutation, denyInvitationMutation } = useGuild();
  const { data: guildData, isError: isGuildError } = useGetGuildById(
    action.guild_id,
  );
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (acceptInvitationMutation.data && acceptInvitationMutation.isSuccess) {
      onOpen();
    }
  }, [
    acceptInvitationMutation.data,
    acceptInvitationMutation.isSuccess,
    onOpen,
  ]);

  const handleAcceptInvitation = () => {
    acceptInvitationMutation.mutate({ action });
  };

  const handleDeclineInvitation = () => {
    denyInvitationMutation.mutate({ action });
  };

  if (!guildData || isGuildError) {
    return null;
  }

  return (
    <>
      <BaseCard
        classNames={{
          base: "border-yellow-800 py-3 md:py-6 px-3 md:px-5 bg-neutral-900 md:border-neutral-800 gap-3 md:gap-5",
        }}
      >
        <p className="w-fit rounded-md border-1 border-yellow-300 px-3 py-1 text-lg font-semibold leading-7 text-amber-300 md:border-0">
          {t("you-have-been-invited")}
        </p>

        <div className="flex items-center gap-2.5">
          <CustomImage
            src={guildData.picture}
            defaultSrc={teamPic}
            width={32}
            height={32}
            className="h-[32px] w-[32px] rounded-full"
            alt="team picture"
          />
          <p className="text-2xl font-semibold leading-loose text-white">
            {guildData.name}
          </p>
        </div>

        <div className="flex justify-between gap-3">
          <TeamInfoItem
            label={t("rank")}
            value={guildData.guild_id}
            className="w-[70px]"
          />
          <TeamInfoItem
            label={t("members")}
            value={guildData.guildMembers.length}
            className="w-[70px]"
          />
          <TeamInfoItem label={t("trades")} value={0} className="w-[70px]" />
          <TeamInfoItem
            label={t("winrate")}
            value={guildData.totalWins}
            className="w-[70px]"
          />
          <TeamInfoItem
            label="Pnl"
            value={guildData.totalPnL}
            className="w-[70px]"
          />
        </div>

        <div className="flex gap-1">
          <Button
            onClick={handleAcceptInvitation}
            className="bg-amber-300 px-4 py-2.5 text-sm text-black"
          >
            {t("accept")}
          </Button>
          <Button
            onClick={handleDeclineInvitation}
            className="bg-neutral-800 px-4 py-2.5 text-sm text-gray-400"
          >
            {t("deny")}
          </Button>
        </div>
      </BaseCard>
      <CongratulationModal
        guildId={action.guild_id}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
