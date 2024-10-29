"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalBody, Spinner } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import BgButton from "@/components/buttons/BgButton/BgButton";
import BorderedInput from "@/components/inputs/BorderedInput/BorderedInput";
import TextButton from "@/components/buttons/TextButton/TextButton";

import { CreateGuildDto } from "@/tizz-trade-actions/client/guild/guild/createGuild";

function isValidHttpUrl(string: string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export type TeamCreationModalProps = {
  isOpen: boolean;
  isPending: boolean;
  onClose(): void;
  onOpenChange(): void;
  onSave(data: CreateGuildDto): void;
  errors?: string[];
};

export default function TeamCreationModal({
  isOpen,
  isPending,
  onClose,
  onOpenChange,
  onSave,
  errors,
}: TeamCreationModalProps) {
  const t = useTranslations("Trade-TeamCreationModal");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [picture, setPicture] = useState<string>("");

  const handleClickSave = () => {
    onSave({ name, description, picture });
  };

  const isReadyToSubmit =
    name.trim() !== "" &&
    description.trim() !== "" &&
    picture.trim() !== "" &&
    isValidHttpUrl(picture);

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
        <ModalBody className="gap-4 p-3 md:gap-8 md:p-6">
          <div className="flex flex-col gap-1 md:gap-2">
            <h6 className="text-2xl text-amber-300 md:text-4xl">
              {t("create-team")}
            </h6>
            <div className="text-xs leading-tight text-gray-400 md:text-sm"></div>
          </div>
          <div className="flex h-fit flex-col gap-4 md:gap-6">
            <BorderedInput
              type="text"
              label="Team Name"
              placeholder="Add you team name here"
              labelPlacement="outside"
              required
              value={name}
              onValueChange={setName}
              fullWidth
            />
            <BorderedInput
              type="text"
              label="Team Description"
              placeholder="Add you team description here"
              labelPlacement="outside"
              value={description}
              onValueChange={setDescription}
              fullWidth
            />
            <BorderedInput
              type="text"
              label="Team Image Url"
              placeholder="Add your team image url"
              labelPlacement="outside"
              value={picture}
              onValueChange={setPicture}
              fullWidth
            />

            <div className="flex flex-col gap-1">
              {errors && errors.length > 0
                ? errors.map((error) => (
                    <p key={error} className="text-sm leading-7 text-red-400">
                      {error}
                    </p>
                  ))
                : null}
            </div>

            <div className="flex flex-col gap-2">
              <BgButton
                onPress={handleClickSave}
                isDisabled={!isReadyToSubmit || isPending}
                className="h-14 w-full items-center justify-center rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-black md:px-5 md:py-3.5 md:text-lg"
              >
                {t("create-team")}
                {isPending && <Spinner color="default" />}
              </BgButton>
              <TextButton
                onPress={onClose}
                isDisabled={isPending}
                className="h-14 w-full items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-semibold text-white md:px-5 md:py-3.5 md:text-lg"
              >
                {t("cancel")}
              </TextButton>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
