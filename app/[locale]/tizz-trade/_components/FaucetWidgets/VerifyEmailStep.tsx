import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "@nextui-org/react";
import { useSnackbar } from "notistack";

import FlatInput from "@/components/inputs/FlatInput/FlatInput";
import BaseCard from "@/components/cards/BaseCard/BaseCard";

import { verifyEmail } from "@/actions/verifyEmail";

type VerifyEmailStepProps = {
  onNext(email: string): void;
};

export function VerifyEmailStep({ onNext }: VerifyEmailStepProps) {
  const { address } = useAccount();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyEmail = async () => {
    if (!/^[a-zA-Z0-9.]+@gmail\.com$/.test(email) || !address) {
      return;
    }

    setIsLoading(true);

    // Send email to backend for verification
    const result = await verifyEmail({ email, address });

    setIsLoading(false);

    if (result) {
      onNext(email);

      enqueueSnackbar(
        "An email has been sent your gmail. Please use the verification Token",
        {
          variant: "success",
        },
      );
    } else {
      enqueueSnackbar(
        "There was an error sending the email. Please try again.",
        {
          variant: "error",
        },
      );
    }
  };

  const isValidEmail = /^[a-zA-Z0-9.]+@gmail\.com$/.test(email) && address;

  return (
    <>
      <BaseCard
        classNames={{
          base: "w-full gap-1 bg-neutral-800 py-2.5 px-3 rounded-md",
        }}
      >
        <span className="text-sm leading-tight text-gray-400">
          Enter A Valid Email
        </span>

        <FlatInput
          inputMode="email"
          type="text"
          pattern="/^[a-zA-Z0-9.]+@gmail\.com$/"
          autoComplete="off"
          placeholder="example@gmail.com"
          classNames={{
            inputWrapper: "max-w-full",
          }}
          value={email}
          onValueChange={setEmail}
        />
      </BaseCard>

      <Button
        onClick={handleVerifyEmail}
        className="w-full rounded-md border-none bg-amber-300 px-4 py-2.5 text-sm font-medium leading-3 text-black"
        isDisabled={!isValidEmail}
        isLoading={isLoading}
      >
        Verify Email
      </Button>
    </>
  );
}
