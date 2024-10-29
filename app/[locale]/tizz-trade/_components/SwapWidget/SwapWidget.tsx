"use client";

import { SwapWidget as UniSwapWidget, darkTheme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";

export default function SwapWidget() {
  return <UniSwapWidget theme={darkTheme} width={500} />;
}
