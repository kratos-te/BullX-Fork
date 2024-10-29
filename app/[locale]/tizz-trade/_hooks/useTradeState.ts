"use client";

import { CollateralTypes } from "@/utils/tizz";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useChainId } from "wagmi";

export type TradeHistorySettings = {
  showCloses: boolean;
  showAllPairs: boolean;
  usdPositionSize: boolean;
  compact: boolean;
};

export type TradeState = {
  collateralType: CollateralTypes;
  pairIndex: number;
  favoritePairIndexes: number[];

  tradeHistorySettings: TradeHistorySettings;
};

export const initialTradeHistorySettings: TradeHistorySettings = {
  showCloses: false,
  showAllPairs: true,
  usdPositionSize: true,
  compact: false,
};

export const initialTradeState: TradeState = {
  collateralType: CollateralTypes.WBTC,
  pairIndex: 0,
  favoritePairIndexes: [0, 1, 2, 3, 4],
  tradeHistorySettings: initialTradeHistorySettings,
};

const LOCAL_STORAGE_KEY = "global-trade-state";

export function useTradeState() {
  const chainId = useChainId();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [LOCAL_STORAGE_KEY, chainId],
    queryFn: async () => {
      try {
        const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!data) {
          return Promise.resolve(initialTradeState);
        }

        const parsedData = JSON.parse(data);

        if (parsedData.tradeHistorySettings) {
          return Promise.resolve(parsedData as TradeState);
        } else {
          return Promise.resolve({
            ...parsedData,
            tradeHistorySettings: initialTradeHistorySettings,
          } as TradeState);
        }
      } catch (err) {
        return Promise.reject(
          new Error("Failed at getting trade state from localstorage"),
        );
      }
    },
  });
  const mutation = useMutation({
    mutationFn: (newState: TradeState) => {
      try {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(newState),
        );

        return Promise.resolve(newState);
      } catch (err) {
        return Promise.reject(
          new Error("Failed at saving trade state from localstorage"),
        );
      }
    },
    onSuccess: (newState: TradeState) => {
      queryClient.setQueriesData(
        { queryKey: [LOCAL_STORAGE_KEY, chainId] },
        () => newState,
      );
    },
  });

  return {
    tradeState: query.data || initialTradeState,
    changeTradeState: mutation.mutate,
  };
}
