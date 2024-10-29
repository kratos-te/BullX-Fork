import Image from "next/image";

import BaseCard from "@/components/cards/BaseCard/BaseCard";

import botanixFaucetSrc from "@/assets/images/botanix-faucet.svg";

export function FaucetDescription() {
  return (
    <BaseCard
      classNames={{
        base: "w-full max-w-[940px] gap-6 md:flex-row bg-neutral-900 p-4 rounded-md",
      }}
    >
      <Image
        src={botanixFaucetSrc}
        className="h-[418px] w-[369px]"
        alt="botanix faucet icon"
      />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h4 className="text-white">Botanix Faucet</h4>
          <p className="text-sm leading-tight text-gray-400">
            Get your funds by clicking on the button (Get) (once every 24 hours)
          </p>
        </div>

        <p className="text-lg leading-7 text-white">
          Notice: Claims only allowed every 24 hours. <br />
          By submitting verification token you are accepting subscription to
          future communication.
        </p>
      </div>
    </BaseCard>
  );
}
