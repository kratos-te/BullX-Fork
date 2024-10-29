"use client";

import { Modal, ModalContent, ModalBody, Spinner } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/buttons/Button/Button";

export type ConfirmModalProps = {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  isOpen: boolean;
  isPending: boolean;
  onClose(): void;
  onOpenChange(): void;
  onConfirm(): void;
  errors?: string[];
};

export default function ConfirmModal({
  title,
  description,
  confirmLabel,
  cancelLabel,
  isOpen,
  isPending,
  onClose,
  onOpenChange,
  onConfirm,
  errors,
}: ConfirmModalProps) {
  const handleClickSave = () => {
    onConfirm();
  };

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
        <ModalBody className="gap-8 p-6">
          <h6 className="text-2xl text-amber-300 md:text-4xl">{title}</h6>
          <p className="text-sm leading-tight text-gray-400">{description}</p>

          <div className="flex flex-col gap-1">
            {errors && errors.length > 0
              ? errors.map((error) => (
                  <p key={error} className="text-sm leading-7 text-red-400">
                    {error}
                  </p>
                ))
              : null}
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              onPress={handleClickSave}
              isDisabled={isPending}
              className="h-14 items-center justify-center rounded-lg bg-amber-300 px-5 py-3.5 text-lg font-semibold text-black"
            >
              {confirmLabel}
              {isPending && <Spinner color="default" />}
            </Button>
            <Button
              onPress={onClose}
              isDisabled={isPending}
              className="h-14 items-center justify-center rounded-lg bg-transparent px-5 py-3.5 text-lg font-semibold text-white"
            >
              {cancelLabel}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
