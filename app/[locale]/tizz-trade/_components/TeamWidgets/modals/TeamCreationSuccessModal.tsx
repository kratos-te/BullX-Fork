"use client";

import { Link } from "@/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import CheckIcon from "@/components/icons/CheckIcon";
import BgButton from "@/components/buttons/BgButton/BgButton";

export type TeamCreationSuccessModalProps = {
  isOpen: boolean;
  guildId?: number;
  onOpenChange(): void;
};

export default function TeamCreationSuccessModal({
  isOpen,
  guildId,
  onOpenChange,
}: TeamCreationSuccessModalProps) {
  const t = useTranslations("Trade-TeamCreationSuccessModal");

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={twMerge(
        "h-fit !w-fit max-w-[471px] rounded-md border border-neutral-700 p-6",
      )}
    >
      <ModalContent className="h-fit w-full gap-8">
        <ModalHeader className="flex flex-col gap-1" />
        <ModalBody className="h-fit !p-0">
          <div className="flex h-fit w-full flex-col gap-6">
            <div className="flex w-full justify-center">
              <CheckIcon />
            </div>
            <div className="w-full text-center text-4xl font-semibold leading-[44px] text-amber-300">
              {t("succcess")}
            </div>
            <div className="w-full text-center text-gray-400">
              {t("description")}
            </div>
            <div className="flex gap-2.5">
              {guildId ? (
                <Link
                  className="w-full"
                  href={`/tizz-trade/team/overview/${guildId}`}
                >
                  <BgButton className="h-14 w-full items-center justify-center rounded-lg bg-amber-300 px-5 py-3.5 text-lg font-semibold text-black">
                    {t("go-to-team-profile")}
                  </BgButton>
                </Link>
              ) : null}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
