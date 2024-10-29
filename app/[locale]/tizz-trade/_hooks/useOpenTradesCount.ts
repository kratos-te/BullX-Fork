"use client";

import { useCallback } from "react";
import { useAccount, useReadContract } from "wagmi";
import { PairIndex } from "@gainsnetwork/sdk";

import { useQueryClient } from "@tanstack/react-query";

import { CollateralTypes, tizzContractAddresses } from "@/utils/tizz";
import { TizzTradingStorageAbi } from "@/abis/Tizz/TizzTradingStorage";
import { Address } from "viem";

export function useOpenTradesCount(
  pairIndex: PairIndex,
  collateralType: CollateralTypes,
) {
  const account = useAccount();

  const queryClient = useQueryClient();

  const { data, queryKey } = useReadContract({
    address: tizzContractAddresses[collateralType].TradingStorage as Address,
    abi: TizzTradingStorageAbi,
    functionName: "openTradesCount",
    args: account.address ? [account.address, BigInt(pairIndex)] : undefined,
  });

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);

  return { count: data !== undefined ? Number(data) : 0, invalidate };
}
