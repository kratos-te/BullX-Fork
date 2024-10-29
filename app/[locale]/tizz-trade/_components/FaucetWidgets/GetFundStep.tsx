import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "@nextui-org/react";
import { useSnackbar, SnackbarKey } from "notistack";

import FlatInput from "@/components/inputs/FlatInput/FlatInput";
import BaseCard from "@/components/cards/BaseCard/BaseCard";
import AwardIcon from "@/components/icons/AwardIcon";
import { encodeIp } from "@/utils/index";
import { sendGetFundTransaction } from "@/actions/sendGetFundTransaction";

type GetFundStepProps = {
  captchaValue: string;
  email: string;
  onNext(): void;
};

export function GetFundStep({ captchaValue, email, onNext }: GetFundStepProps) {
  const { address } = useAccount();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendTransaction = async () => {
    if (!address) {
      return;
    }

    let snackbarId: SnackbarKey | undefined;

    try {
      setIsLoading(true);

      //add toast with toastIdRef
      snackbarId = enqueueSnackbar(`Sending funds to ${address}`, {
        variant: "info",
        persist: true,
      });

      // get user ip
      const ip = await fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => data.ip);

      console.log(ip);

      let encodedIp = "";

      try {
        encodedIp = encodeIp(ip);
      } catch (error) {
        console.log("error encoding ip", error);
      }

      const response = await sendGetFundTransaction({
        address,
        captcha: captchaValue,
        ip,
        encoded: encodedIp,
        email,
        verificationToken: code,
      });

      if (response.status === 400) {
        throw new Error("invalid captcha");
      }

      closeSnackbar(snackbarId);

      if (response.status === 429) {
        enqueueSnackbar(
          "Withdraw limit reached. Please try again after 24h later.",
          {
            variant: "error",
            autoHideDuration: 9000,
          },
        );

        setIsLoading(false);
        return;
      }

      if (response.status === 329) {
        enqueueSnackbar(
          `Error sending Funds. Please try again later ${response.error}.`,
          {
            variant: "error",
            autoHideDuration: 9000,
          },
        );

        setIsLoading(false);
        return;
      }

      if (!response.hash) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      enqueueSnackbar("We've sent you testnet BTC funds.", {
        variant: "success",
        autoHideDuration: 9000,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      closeSnackbar(snackbarId);

      enqueueSnackbar(`Error sending Funds. ${error}`, {
        variant: "error",
        autoHideDuration: 9000,
      });
    }
  };

  return (
    <>
      <BaseCard
        classNames={{
          base: "w-full gap-1 bg-neutral-800 py-2.5 px-3 rounded-md",
        }}
      >
        <span className="text-sm leading-tight text-gray-400">
          Enter Verification Token
        </span>

        <FlatInput
          inputMode="text"
          type="text"
          autoComplete="off"
          classNames={{
            inputWrapper: "max-w-full",
          }}
          value={code}
          onValueChange={setCode}
        />
      </BaseCard>

      <Button
        className="w-full rounded-md border-none bg-amber-300 px-4 py-2.5 text-sm font-medium leading-3 text-black"
        onClick={handleSendTransaction}
        isDisabled={code.trim().length === 0 || !address}
        isLoading={isLoading}
      >
        Get Your Funds
      </Button>
    </>
  );
}
