"use client";

import { useCallback, useState } from "react";
import { Address, erc20Abi } from "viem";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useConfig,
} from "wagmi";
import {
  waitForTransactionReceipt,
  WaitForTransactionReceiptErrorType,
} from "@wagmi/core";
import { useQueryClient } from "@tanstack/react-query";

export type UseApprove = {
  erc20Address: Address;
  owner?: Address;
  spender: Address;
  onError?: () => void;
};

export function useApprove({
  erc20Address,
  owner,
  spender,
  onError,
}: UseApprove) {
  const [waitingForTransactionReceipt, setWaitingForTransactionReceipt] =
    useState(false);

  const queryClient = useQueryClient();

  const account = useAccount();
  const config = useConfig();
  const { writeContract } = useWriteContract();

  const { data, queryKey, refetch, isLoading } = useReadContract({
    address: erc20Address,
    abi: erc20Abi,
    functionName: "allowance",
    args: owner ? [owner, spender] : undefined,
  });

  const approve = useCallback(
    (amount: bigint) => {
      if (!account.address) {
        return;
      }

      writeContract(
        {
          address: erc20Address,
          abi: erc20Abi,
          functionName: "approve",
          args: [spender, amount],
        },
        {
          onSuccess: async (hash) => {
            setWaitingForTransactionReceipt(true);
            try {
              await waitForTransactionReceipt(config, {
                hash,
              });
              queryClient.invalidateQueries({ queryKey });
              refetch();
            } catch (err) {
              console.log(
                "Reverted approve transaction: ",
                Object.entries(err as WaitForTransactionReceiptErrorType),
              );

              onError?.();
            }

            setWaitingForTransactionReceipt(false);
          },
          onError: (err) => {
            console.log("Failed at Approve: ", Object.entries(err));

            onError?.();
          },
        },
      );
    },
    [
      account.address,
      config,
      erc20Address,
      onError,
      queryClient,
      queryKey,
      refetch,
      spender,
      writeContract,
    ],
  );

  return {
    allowance: data,
    refetch,
    isLoading,
    approve,
    waitingForTransactionReceipt,
  };
}
