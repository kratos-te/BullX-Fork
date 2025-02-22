"use client";

import { getAssetClassFromGroupIndex, type Pair } from "@gainsnetwork/sdk";
import type {
  Bar,
  LibrarySymbolInfo,
  IBasicDataFeed,
  DatafeedConfiguration,
  ResolutionString,
} from "@/libraries/charting_library";

import { subscribeOnStream, unsubscribeFromStream } from "./streaming";
import { getChartTable } from "@/tizz-trade-actions/client/getChartTable";

const lastBarsCache = new Map<string, Bar>();

// DatafeedConfiguration implementation
const configurationData: DatafeedConfiguration = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: [
    "1",
    "5",
    "15",
    "45",
    "60",
    "240",
    "1440",
  ] as ResolutionString[],
};

export function getDataFeed({
  name,
  groupIndex,
  pairIndex,
}: {
  name: string;
  groupIndex: number;
  pairIndex: number;
}): IBasicDataFeed {
  return {
    onReady: (callback) => {
      console.log("[onReady]: Method call");
      setTimeout(() => callback(configurationData));
    },

    searchSymbols: () => {
      console.log("[searchSymbols]: Method call");
    },

    resolveSymbol: async (
      symbolName,
      onSymbolResolvedCallback,
      _onResolveErrorCallback,
      _extension,
    ) => {
      console.log("[resolveSymbol]: Method call", symbolName);

      // Symbol information object
      const symbolInfo: LibrarySymbolInfo = {
        ticker: name,
        name: name,
        description: name,
        type: getAssetClassFromGroupIndex(groupIndex) || "crypto",
        session: "24x7",
        timezone: "Etc/UTC",
        minmov: 1,
        pricescale: 100,
        exchange: "",
        has_intraday: true,
        has_weekly_and_monthly: false,
        supported_resolutions: configurationData.supported_resolutions,
        volume_precision: 2,
        data_status: "streaming",
        format: "price",
        listed_exchange: "",
      };

      console.log("[resolveSymbol]: Symbol resolved", symbolName);
      setTimeout(() => onSymbolResolvedCallback(symbolInfo));
    },

    getBars: async (
      symbolInfo: LibrarySymbolInfo,
      resolution,
      periodParams,
      onHistoryCallback,
      onErrorCallback,
    ) => {
      const { from, to, firstDataRequest } = periodParams;
      console.log("[getBars]: Method call", symbolInfo, resolution, from, to);

      try {
        const chartTable = await getChartTable({
          pairIndex: pairIndex,
          from,
          to,
          range: +resolution,
        });

        if (!chartTable || !chartTable.table) {
          // "noData" should be set if there is no data in the requested period
          onHistoryCallback([], {
            noData: true,
          });
          return;
        }

        let bars: Bar[] = [];

        chartTable.table.forEach((bar: Bar) => {
          if (bar.time >= from && bar.time < to) {
            bars = [...bars, { ...bar, time: bar.time * 1000 }];
          }
        });

        if (firstDataRequest) {
          lastBarsCache.set(symbolInfo.name, {
            ...bars[bars.length - 1],
          });
        }

        console.log(`[getBars]: returned ${bars.length} bar(s)`);
        onHistoryCallback(bars, {
          noData: false,
        });
      } catch (error: any) {
        console.log("[getBars]: Get error", error);
        onErrorCallback(error);
      }
    },

    subscribeBars: (
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
    ) => {
      console.log(
        "[subscribeBars]: Method call with subscriberUID:",
        subscriberUID,
      );

      subscribeOnStream(
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscriberUID,
        onResetCacheNeededCallback,
        lastBarsCache.get(symbolInfo.name)!,
        pairIndex,
      );
    },

    unsubscribeBars: (subscriberUID) => {
      console.log(
        "[unsubscribeBars]: Method call with subscriberUID:",
        subscriberUID,
      );
      unsubscribeFromStream(subscriberUID);
    },
  };
}
