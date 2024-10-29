"use client";

import { useState } from "react";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import TokenIcon from "@/components/icons/TokenIcon";

import { CaptchaStep } from "./CaptchaStep";
import { VerifyEmailStep } from "./VerifyEmailStep";
import { GetFundStep } from "./GetFundStep";

export function FaucetRequest() {
  const [step, setStep] = useState(0);
  const [captchaCode, setCaptchaCode] = useState("");
  const [email, setEmail] = useState("");

  const handleNextCaptchaStep = (value: string) => {
    setCaptchaCode(value);
    setStep(1);
  };

  const handleNextVerifyEmailStep = (value: string) => {
    setEmail(value);
    setStep(2);
  };

  const handleNextGetFundStep = () => {
    setStep(3);
  };

  const stepComs = [
    <CaptchaStep key="captchaStep" onNext={handleNextCaptchaStep} />,
    <VerifyEmailStep
      key="verifyEmailStep"
      onNext={handleNextVerifyEmailStep}
    />,
    <GetFundStep
      key="getFundStep"
      email={email}
      captchaValue={captchaCode}
      onNext={handleNextGetFundStep}
    />,
    <div key="ended"></div>,
  ];

  return (
    <BaseCard
      classNames={{
        base: "w-full h-fit max-w-[425px] gap-6 bg-neutral-900 p-4 rounded-md",
      }}
    >
      <p className="text-lg font-semibold leading-7 text-amber-300">
        Request Funds
      </p>

      <BaseCard
        classNames={{
          base: "w-full gap-1 bg-neutral-800 py-2.5 px-3 rounded-md my-4",
        }}
      >
        <span className="text-sm leading-tight text-gray-400">Receive</span>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-black text-gray-400">0.001</span>

          <BaseCard
            classNames={{
              base: "w-fit h-fit gap-1.5 bg-gray-800 flex-row py-2 px-3 rounded-md",
            }}
          >
            <TokenIcon token="btc" width={16} height={16} />
            <span className="text-xs font-medium leading-[14px] text-white">
              BTC
            </span>
          </BaseCard>
        </div>
      </BaseCard>

      {stepComs[step]}
    </BaseCard>
  );
}
