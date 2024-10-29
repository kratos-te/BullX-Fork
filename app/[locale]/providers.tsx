"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

import { config } from "@/utils/wagmi";

export type EventFeedData = {
  name: string;
  value: unknown;
};

export const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
      <QueryClientProvider client={queryClient}>
          <NextUIProvider className="overflow-hidden">
            <SnackbarProvider autoHideDuration={5000} maxSnack={5}>
              {children}
            </SnackbarProvider>
          </NextUIProvider>
      </QueryClientProvider>
  );
}
