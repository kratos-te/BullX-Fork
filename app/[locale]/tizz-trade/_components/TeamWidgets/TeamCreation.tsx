"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";

import { useGuild } from "@/tizz-trade-hooks/guild/useGuild";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import BgButton from "@/components/buttons/BgButton/BgButton";

import bigBeeSrc from "@/assets/images/bigbee.svg";
import TeamCreationModal from "./modals/TeamCreationModal";
import TeamCreationSuccessModal from "./modals/TeamCreationSuccessModal";

import { CreateGuildDto } from "@/tizz-trade-actions/client/guild/guild/createGuild";

export default function TeamCreation() {
  const t = useTranslations("Trade-TeamCreation");

  const { createGuildMutation } = useGuild();
  const {
    isOpen: isCreationModalOpen,
    onOpen: onCreationModalOpen,
    onClose: onCreationModalClose,
    onOpenChange: onCreationModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onOpenChange: onSuccessModalOpenChange,
  } = useDisclosure();

  useEffect(() => {
    if (createGuildMutation.data && createGuildMutation.isSuccess) {
      onSuccessModalOpen();
      onCreationModalClose();
    }
  }, [createGuildMutation, onCreationModalClose, onSuccessModalOpen]);

  const handleCreateGuild = (data: CreateGuildDto) => {
    createGuildMutation.mutate(data);
  };

  return (
    <>
      <BaseCard
        classNames={{
          base: "p-8 flex-row w-full md:gap-[61px] items-center bg-neutral-900",
        }}
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl text-white md:text-5xl">
            {t("create-your-hive")}
          </h4>
          <p className="text-xs leading-5 text-gray-400 md:text-lg md:leading-7">
            {t("description")}
          </p>
          <BgButton
            onClick={onCreationModalOpen}
            className="rounded-md bg-amber-300 px-4 py-2 text-sm text-black md:py-4"
          >
            {t("create-your-team")}
          </BgButton>
        </div>

        <Image
          src={bigBeeSrc}
          className="h-[88px] w-[105px] pr-6 md:h-[233px]  md:w-[200px] md:pr-[48px]"
          alt="BigBee"
        />
      </BaseCard>
      <TeamCreationModal
        isOpen={isCreationModalOpen}
        isPending={createGuildMutation.isPending}
        onClose={onCreationModalClose}
        onOpenChange={onCreationModalOpenChange}
        onSave={handleCreateGuild}
        errors={createGuildMutation.error?.message}
      />
      <TeamCreationSuccessModal
        isOpen={isSuccessModalOpen}
        guildId={createGuildMutation.data?.guild_id}
        onOpenChange={onSuccessModalOpenChange}
      />
    </>
  );
}
