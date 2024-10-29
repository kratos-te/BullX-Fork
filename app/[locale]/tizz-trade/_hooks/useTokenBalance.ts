"use client";

import { useReadContracts } from "wagmi";
import { erc20Abi, Address } from "viem";

export function useTokenBalance({
  contractAddress,
  ownerAddress,
}: {
  contractAddress?: Address;
  ownerAddress?: Address;
}) {
  const { data } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: ownerAddress ? [ownerAddress] : undefined,
      },
      {
        address: contractAddress,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ],
    query: {
      refetchInterval: 5000,
    },
  });

  const [balanceData, decimalsData] = data ? [...data] : [undefined, undefined];

  return {
    balance:
      balanceData?.status === "success" ? balanceData.result! : undefined,
    precision: Math.pow(
      10,
      decimalsData?.status === "success" ? decimalsData.result! : 0,
    ),
  };
}
