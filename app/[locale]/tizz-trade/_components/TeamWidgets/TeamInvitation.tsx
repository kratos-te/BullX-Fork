"use client";

import { useMemo } from "react";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import { useDisclosure } from "@nextui-org/react";
import { useUserJWT } from "@/tizz-trade-hooks/guild/useUserJWT";
import { useGetUser } from "@/tizz-trade-hooks/guild/useGetUser";
import { useGetInvitationRequests } from "@/tizz-trade-hooks/guild/useGetInvitationRequests";

import TextButton from "@/components/buttons/TextButton/TextButton";
import TeamInvitationCard from "./TeamInvitationCard";
import TeamInvitationCardSkeleton from "./skeletons/TeamInvitationCardSkeleton";

export default function TeamInvitation() {
  const t = useTranslations("Trade-TeamInvitation");

  const { userJwtQuery } = useUserJWT();
  const { data: userData, isFetching: isUserDataFetching } = useGetUser();
  const { data: invitationData, isFetching } = useGetInvitationRequests(
    userData?.id || null,
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const filteredActions = useMemo(() => {
    if (isFetching || !invitationData) {
      return [];
    }

    return invitationData?.filter((action) => action.status === "PENDING");
  }, [invitationData, isFetching]);

  if (!userJwtQuery.data || !userJwtQuery.isSuccess) {
    return null;
  }

  if (isFetching || isUserDataFetching) {
    return <TeamInvitationCardSkeleton />;
  }

  return (
    <div className="relative">
      {filteredActions.length > 0 ? (
        <TeamInvitationCard
          key={filteredActions[0].action_id}
          action={filteredActions[0]}
        />
      ) : null}

      {filteredActions.length > 1 && (
        <TextButton
          className="absolute bottom-5 right-5 text-gray-400"
          onClick={onOpen}
        >
          {t("view-all")}...
        </TextButton>
      )}

      {filteredActions.length > 1 && (
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className={twMerge(
            "max-w-[471px] rounded-md border border-stroke bg-neutral-950",
          )}
        >
          <ModalContent>
            <ModalBody className="max-h-[80vh] overflow-auto p-6">
              <div className="flex flex-col gap-8">
                {filteredActions.map((action) => (
                  <TeamInvitationCard key={action.action_id} action={action} />
                ))}
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
