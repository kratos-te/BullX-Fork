"use client";

import { Link } from "@/navigation";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import StarsIcon from "@/components/icons/StarsIcon";
import Button from "@/components/buttons/Button/Button";

export type CongratulationModalProps = {
  guildId: number;
  isOpen: boolean;
  onClose(): void;
  onOpenChange(): void;
};

export default function CongratulationModal({
  guildId,
  isOpen,
  onClose,
  onOpenChange,
}: CongratulationModalProps) {
  const t = useTranslations("Trade-CongratulationModal");

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={twMerge(
        "max-w-[471px] rounded-md border border-stroke bg-neutral-950",
      )}
    >
      <ModalContent>
        <ModalBody className="items-center gap-8 p-6">
          <StarsIcon className="text-amber-300" />
          <h6 className="text-amber-300">{t("congratulations")}</h6>
          <p className="text-gray-400">{t("description")}</p>
          <Link
            className="w-full"
            href={`/tizz-trade/team/overview/${guildId}`}
            onClick={onClose}
          >
            <Button className="h-14 w-full items-center justify-center rounded-lg bg-amber-300 px-5 py-3.5 text-lg font-semibold text-black">
              {t("go-to-team-profile")}
            </Button>
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
