"use client";

import { useState } from "react";

import ArrowDownIcon from "@/components/icons/arrow/ArrowDownIcon";
import PredictionButton from "@/components/buttons/PredictionButton/PredictionButton";

import { ClaimPanel } from "./ClaimPanel";
import { InputPanel } from "./InputPanel";
import { twMerge } from "tailwind-merge";

export function PredictForm() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={twMerge("hidden flex-col gap-6 md:flex", show ? "flex" : "")}
      >
        <InputPanel amount="0" onChange={() => {}} balance={503} />

        <ClaimPanel balance={1234} isClaim={false} onChange={() => {}} />

        <div className="flex flex-col gap-3.5">
          <div className="flex w-full flex-col gap-2.5 md:flex-row">
            <PredictionButton className="w-full" color="green">
              <ArrowDownIcon width={24} height={24} className="rotate-180" />
              Enter Up
            </PredictionButton>
            <PredictionButton className="w-full" color="red">
              Enter Down <ArrowDownIcon width={24} height={24} />
            </PredictionButton>
          </div>
          <span className="text-center text-xs font-medium leading-[18px] text-[#aaaaaa] lg:text-lg">
            Once entered, your position cannot be changed or removed.
          </span>
        </div>
      </div>

      <PredictionButton
        color="green"
        className={twMerge("md:hidden", show ? "hidden" : "")}
        onClick={() => setShow(true)}
      >
        Participate in this round
      </PredictionButton>
    </>
  );
}
