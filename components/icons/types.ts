import { ComponentPropsWithoutRef } from "react";

export interface SVGProps extends ComponentPropsWithoutRef<"svg"> {
  fill?: string;
  filled?: boolean;
  size?: number;
  height?: number;
  width?: number;
}
