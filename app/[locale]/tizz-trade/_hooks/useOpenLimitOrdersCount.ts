"use client";

import { useCallback } from "react";
import { PairIndex } from "@gainsnetwork/sdk";
import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";

import { useQueryClient } from "@tanstack/react-query";

import { tizzContractAddresses, CollateralTypes } from "@/utils/tizz";
import { TizzTradingStorageAbi } from "@/abis/Tizz/TizzTradingStorage";

export function useOpenLimitOrdersCount(
  pairIndex: PairIndex,
  collateralType: CollateralTypes,
) {
  const account = useAccount();

  const queryClient = useQueryClient();

  const { data, queryKey } = useReadContract({
    address: tizzContractAddresses[collateralType].TradingStorage as Address,
    abi: TizzTradingStorageAbi,
    functionName: "openLimitOrdersCount",
    args: account.address ? [account.address, BigInt(pairIndex)] : undefined,
  });

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);

  return { count: data !== undefined ? Number(data) : 0, invalidate };
}
