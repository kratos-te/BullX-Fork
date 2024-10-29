"use client";

import { useAccount, useReadContracts, useWatchContractEvent } from "wagmi";
import { Address } from "viem";

import { CollateralTypes, tizzContractAddresses } from "@/utils/tizz";
import { TTokenAbi } from "@/abis/Tizz/TToken";
import { useQueryClient } from "@tanstack/react-query";

export const PRECISION = 1e18;
export const TIZZ_PRECISION = 1e18;
export const EPOCH_PERIOD = 3 * 24 * 3600 * 1000;

export function useVaultsVariables(collateralType: CollateralTypes) {
  const account = useAccount();

  const queryClient = useQueryClient();

  const { data } = useReadContracts({
    contracts: [
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "tvl",
      },
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "shareToAssetsPrice",
      },
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "totalSupply",
      },
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "collateralizationP",
      },
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "currentEpoch",
      },
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "currentEpochStart",
      },
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "accPnlPerToken",
      },
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "maxRedeem",
      },
    ],
  });

  const [
    tvlData,
    shareToAssetsPriceData,
    totalSupplyData,
    collateralizationPData,
    currentEpochData,
    currentEpochStartData,
    accPnlPerTokenData,
    maxRedeemData,
  ] = data
    ? [...data]
    : [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ];

  const { data: withdrawRequests, queryKey } = useReadContracts({
    contracts: [
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "withdrawRequests",
        args:
          account.address !== undefined &&
          currentEpochData?.status === "success"
            ? [account.address, currentEpochData.result + 1n]
            : undefined,
      },
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "withdrawRequests",
        args:
          account.address !== undefined &&
          currentEpochData?.status === "success"
            ? [account.address, currentEpochData.result + 2n]
            : undefined,
      },
      {
        address: tizzContractAddresses[collateralType].tDAI as Address,
        abi: TTokenAbi,
        functionName: "withdrawRequests",
        args:
          account.address !== undefined &&
          currentEpochData?.status === "success"
            ? [account.address, currentEpochData.result + 3n]
            : undefined,
      },
    ],
  });

  // useWatchContractEvent({
  //   address: tizzContractAddresses[collateralType].tDAI as Address,
  //   abi: TTokenAbi,
  //   eventName: "WithdrawRequested",
  //   args: {
  //     owner: account.address,
  //     sender: account.address,
  //   },
  //   onLogs(logs) {
  //     if (logs && logs.length > 0) {
  //       queryClient.invalidateQueries({ queryKey });
  //     }
  //   },
  // });
  // useWatchContractEvent({
  //   address: tizzContractAddresses[collateralType].tDAI as Address,
  //   abi: TTokenAbi,
  //   eventName: "WithdrawCanceled",
  //   args: {
  //     owner: account.address,
  //     sender: account.address,
  //   },
  //   onLogs(logs) {
  //     if (logs && logs.length > 0) {
  //       queryClient.invalidateQueries({ queryKey });
  //     }
  //   },
  // });

  return {
    tvl: tvlData?.status === "success" ? tvlData.result : undefined,
    shareToAssetsPrice:
      shareToAssetsPriceData?.status === "success"
        ? shareToAssetsPriceData.result
        : undefined,
    totalSupply:
      totalSupplyData?.status === "success"
        ? totalSupplyData.result
        : undefined,
    collateralizationP:
      collateralizationPData?.status === "success"
        ? collateralizationPData.result
        : undefined,
    currentEpoch:
      currentEpochData?.status === "success"
        ? currentEpochData.result
        : undefined,
    currentEpochStart:
      currentEpochStartData?.status === "success"
        ? currentEpochStartData.result
        : undefined,
    accPnlPerToken:
      accPnlPerTokenData?.status === "success"
        ? accPnlPerTokenData.result
        : undefined,
    maxRedeem:
      maxRedeemData?.status === "success" ? maxRedeemData.result : undefined,
    withdrawRequests,
  };
}
