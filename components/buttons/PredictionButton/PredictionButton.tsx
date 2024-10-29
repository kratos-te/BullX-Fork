import { Lato } from "next/font/google";

import { Button, ButtonProps } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

type PredictionColor = "green" | "red";

const bgClassesByColor: Record<PredictionColor, string> = {
  green: "bg-gradient-to-b from-[#4caf50] to-[#246a54]",
  red: "bg-gradient-to-b from-[#ff6767] to-[#993d3d]",
};

export type PredictionButtonProps = Omit<ButtonProps, "color"> & {
  color: PredictionColor;
};

export default function PredictionButton({
  color,
  ...props
}: PredictionButtonProps) {
  return (
    <Button
      aria-label="prediction-button"
      disableRipple
      {...props}
      className={twMerge(
        "flex h-10 items-center gap-2 rounded-lg text-base font-medium text-[#f8fff6]",
        bgClassesByColor[color],
        lato.className,
        props.className,
      )}
    />
  );
}
