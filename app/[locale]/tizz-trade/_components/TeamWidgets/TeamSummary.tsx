"use client";

import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/navigation";
import { useRouter } from "@/navigation";
import { useDisclosure } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import Button from "@/components/buttons/Button/Button";
import CustomImage from "@/components/image/CustomImage";
import teamPicSrc1 from "@/assets/images/zentoshi/teamTrader.svg";

import { useGetGuildById } from "@/tizz-trade-hooks/guild/useGetGuildById";
import { useGuild } from "@/tizz-trade-hooks/guild/useGuild";
import { useGetUser } from "@/tizz-trade-hooks/guild/useGetUser";

import { TeamInfoCard } from "./TeamInfoCard";

import TeamInvitationCreationModal from "./modals/TeamInvitationCreationModal";
import ConfirmModal from "./modals/ConfirmModal";
import TeamSummarySkeleton from "./skeletons/TeamSummarySkeleton";
import { getPercentageStr, getPriceStr } from "@/utils/price";

export type TeamSummaryProps = {
  showActions?: boolean;
  guildId: number;
};

export default function TeamSummary({
  guildId,
  showActions,
}: TeamSummaryProps) {
  const t = useTranslations("Trade-TeamSummary");

  const router = useRouter();

  const {
    data: guildData,
    error: guildError,
    isError: isGuildError,
  } = useGetGuildById(guildId);

  const { data: userData } = useGetUser();

  const {
    isOpen: isInvitationModalOpen,
    onOpen: onInvitationModalOpen,
    onClose: onInvitationModalClose,
    onOpenChange: onInvitationModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isJoinModalOpen,
    onOpen: onJoinModalOpen,
    onClose: onJoinModalClose,
    onOpenChange: onJoinModalOpenChange,
  } = useDisclosure();

  const { sendInvitationMutation, createJoinRequestMutation } = useGuild();

  useEffect(() => {
    if (guildError && isGuildError) {
      router.push(`/tizz-trade/team/overview`);
    }
  }, [guildError, isGuildError, router]);

  useEffect(() => {
    if (sendInvitationMutation.data && sendInvitationMutation.isSuccess) {
      onInvitationModalClose();
    }
  }, [
    onInvitationModalClose,
    sendInvitationMutation.data,
    sendInvitationMutation.isSuccess,
  ]);

  useEffect(() => {
    if (createJoinRequestMutation.data && createJoinRequestMutation.isSuccess) {
      onJoinModalClose();
    }
  }, [createJoinRequestMutation, onJoinModalClose]);

  const handleSendInvitation = (userId: number) => {
    sendInvitationMutation.mutate({ guild_id: guildId, user_id: userId });
  };

  const handleCreateGuildJoinRequest = () => {
    createJoinRequestMutation.mutate({ guild_id: guildId });
  };

  if (!guildData) {
    return <TeamSummarySkeleton showActions={showActions} />;
  }

  const isOwner = userData && guildData.owner_user_id === userData.id;

  const isNonTeamMember =
    !userData ||
    (userData &&
      userData.guildMembers.length === 0 &&
      userData.ownedGuilds.length === 0);

  const hiddenJoinButton =
    createJoinRequestMutation.data && createJoinRequestMutation.isSuccess;
  const hiddenInvitationButton =
    createJoinRequestMutation.data && createJoinRequestMutation.isSuccess;

  return (
    <>
      <BaseCard
        classNames={{
          base: "p-4 bg-neutral-900 gap-3 md:gap-6 md:flex-row w-full",
        }}
      >
        <CustomImage
          src={guildData.picture}
          defaultSrc={teamPicSrc1}
          alt="Team Pic"
          className="w-full md:h-[250px] md:w-[300px]"
          width={300}
          height={250}
        />

        <div className="flex w-full flex-col gap-6 md:w-[calc(100%-340px)]">
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-semibold text-white md:text-5xl">
              {guildData.name}
            </h4>
            <p className="text-xs leading-tight text-gray-400 md:text-sm">
              {guildData.description}
            </p>
          </div>

          {!showActions ? (
            <div
              className={twMerge(
                "flex w-full flex-col justify-between gap-3.5",
              )}
            >
              <div className={twMerge("flex w-full justify-between gap-3.5")}>
                <TeamInfoCard
                  label={t("rank")}
                  className={twMerge("w-1/3")}
                  value={guildData.rank}
                />
                <TeamInfoCard
                  label={t("members")}
                  className={twMerge("w-1/3")}
                  value={guildData.guildMembers.length}
                />
                <TeamInfoCard
                  label={t("trades")}
                  className={twMerge("w-1/3")}
                  value={guildData.totalTrades}
                />
              </div>
              <div className={twMerge("flex w-full justify-between gap-3.5")}>
                <TeamInfoCard
                  label={t("winrate")}
                  className={twMerge("w-1/2")}
                  value={
                    guildData.totalTrades
                      ? `${((guildData.totalOverAllWins * 100) / guildData.totalTrades).toFixed(1)}%`
                      : "-"
                  }
                />
                <TeamInfoCard
                  label="PnL"
                  className={twMerge("w-1/2")}
                  value={`$${getPriceStr(guildData.totalOverAllPnL)}`}
                />
              </div>
            </div>
          ) : (
            <div
              className={twMerge("flex w-full flex-wrap justify-start gap-2")}
            >
              <TeamInfoCard label={t("rank")} value={guildData.rank} />
              <TeamInfoCard
                label={t("members")}
                value={guildData.guildMembers.length}
              />
              <TeamInfoCard label={t("trades")} value={guildData.totalTrades} />
              <TeamInfoCard
                label={t("winrate")}
                value={
                  guildData.totalTrades
                    ? `${((guildData.totalOverAllWins * 100) / guildData.totalTrades).toFixed(1)}%`
                    : "-"
                }
              />
              <TeamInfoCard
                label="PnL"
                value={`$${getPriceStr(guildData.totalOverAllPnL)}`}
              />
            </div>
          )}

          {showActions && (
            <div className="flex justify-between gap-2 md:justify-start">
              <Link
                href={`/tizz-trade/team/details/${guildId}`}
                className="w-full md:w-fit"
              >
                <Button className="w-full flex-1 bg-amber-300 px-4 py-2.5 text-sm text-black md:w-fit">
                  {t("check-team")}
                </Button>
              </Link>

              {isOwner && !hiddenInvitationButton && (
                <Button
                  className="w-full px-4 py-2.5 text-sm text-gray-400 md:w-fit"
                  onClick={onInvitationModalOpen}
                >
                  {t("invite-team")}
                </Button>
              )}

              {isNonTeamMember && !hiddenJoinButton && (
                <Button
                  className="px-4 py-2.5 text-sm text-gray-400"
                  onClick={onJoinModalOpen}
                >
                  {t("join-team")}
                </Button>
              )}
            </div>
          )}
        </div>
      </BaseCard>
      <TeamInvitationCreationModal
        isOpen={isInvitationModalOpen}
        isPending={sendInvitationMutation.isPending}
        onClose={onInvitationModalClose}
        onOpenChange={onInvitationModalOpenChange}
        onSave={handleSendInvitation}
        errors={sendInvitationMutation.error?.message}
      />
      <ConfirmModal
        title={t("send-join-request")}
        description={t("are-you-sure-to-join-this-team")}
        confirmLabel={t("yes")}
        cancelLabel={t("no")}
        isOpen={isJoinModalOpen}
        isPending={createJoinRequestMutation.isPending}
        onClose={onJoinModalClose}
        onOpenChange={onJoinModalOpenChange}
        onConfirm={handleCreateGuildJoinRequest}
        errors={createJoinRequestMutation.error?.message}
      />
    </>
  );
}
