"use client";
import { Key, useRef, useEffect, useCallback } from "react";
import { Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";
import Chart from "chart.js/auto";

import ChartGraphIcon from "@/components/icons/ChartGraphIcon";
import IconButton from "@/components/buttons/IconButton/IconButton";
import BaseSwitch from "@/components/switchs/BaseSwitch/BaseSwitch";
import BaseTabs, { TabItem } from "@/components/tabs/BaseTabs/BaseTabs";

import { TradeHistoryRecord } from "@/types/index";

export type PortfolioPNLPanelProps = {
  tradeHistories: TradeHistoryRecord[];
  rangeStr: string;
  isTeamView: boolean;
  onChangeViewMode: (value: boolean) => void;
  onRangeSelectionChange: (value: Key) => void;
  isFetching: boolean;
};

export default function PortfolioPNLPanel({
  tradeHistories,
  rangeStr,
  isTeamView,
  onChangeViewMode,
  onRangeSelectionChange,
  isFetching,
}: PortfolioPNLPanelProps) {
  const t = useTranslations("Trade-PortfolioPNLPanel");

  const account = useAccount();

  const bigTabItems: TabItem[] = [
    {
      id: "24h",
      label: "24h",
    },
    {
      id: "1w",
      label: "1W",
    },
    {
      id: "1m",
      label: "1M",
    },
    {
      id: "3m",
      label: "3M",
    },
    {
      id: "all",
      label: t("all"),
    },
  ];

  const chartRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<Chart>();

  const drawChart = useCallback(() => {
    if (ref.current) {
      ref.current.destroy();
    }

    const data: {
      pnl: number;
      date: Date;
    }[] = [];
    let sum = 0;

    tradeHistories
      .sort((a, b) => {
        const first = new Date(a.date);
        const second = new Date(b.date);

        if (first > second) {
          return 1;
        } else if (first < second) {
          return -1;
        } else {
          return 0;
        }
      })
      .forEach((history) => {
        if (!isTeamView && history.address !== account.address) {
          return;
        }

        sum += history.pnl_net * history.collateralPriceUsd;

        if (data.length === 0) {
          data.push({
            pnl: 0,
            date: new Date(history.date),
          });
        }

        data.push({
          pnl: sum,
          date: new Date(history.date),
        });
      });

    if (data.length === 0) {
      data.push(
        ...[
          {
            pnl: 0,
            date: new Date(),
          },
          {
            pnl: 0,
            date: new Date(),
          },
        ],
      );
    }

    const chartContainer = chartRef.current!;

    ref.current = new Chart(chartContainer, {
      type: "line",
      data: {
        labels: data.map((item) => item.date),
        datasets: [
          {
            data: data.map((item) => item.pnl),
            borderColor: "#FE6BB9",
            pointRadius: 0,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [account.address, isTeamView, tradeHistories]);

  useEffect(() => {
    if (!chartRef.current || !containerRef.current) {
      return;
    }

    drawChart();

    const observer = new ResizeObserver(() => {
      drawChart();
    });

    observer.observe(containerRef.current);

    return () => {
      ref.current?.destroy();
      observer.disconnect();
    };
  }, [drawChart, tradeHistories]);

  return (
    <div className="flex h-full w-full flex-col flex-wrap items-start justify-start gap-3.5 rounded-md border border-gray-800 bg-neutral-900 p-[10px]">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-3.5">
          <IconButton
            className={twMerge(
              "flex items-center justify-center gap-2.5 rounded-md !border-1 !border-gray-800 bg-neutral-800",
              "h-[24px] w-[24px] p-0 md:h-10 md:w-10 md:p-2",
            )}
          >
            <ChartGraphIcon
              width={14}
              height={14}
              fill="#F4CD8C"
              className="block md:hidden"
            />
            <ChartGraphIcon
              width={24}
              height={24}
              fill="#F4CD8C"
              className="hidden md:block"
            />
          </IconButton>
          <div
            className={twMerge(
              "font-semibold leading-loose text-white",
              "text-lg sm:text-lg md:text-2xl",
            )}
          >
            PNL
          </div>
        </div>

        <BaseTabs
          variant="bordered"
          tabs={bigTabItems}
          selectedKey={rangeStr}
          onSelectionChange={onRangeSelectionChange}
          classNames={{
            base: "flex w-fit",
            tab: "w-[45px]",
            cursor:
              "!bg-neutral-800 !rounded-md !border-zinc-800 text-gray-400",
            tabList: "rounded !border-none p-1 gap-0 border-[1px]",
            tabContent:
              "text-sm text-gray-400 p-1 group-data-[selected=true]:text-white",
          }}
        />
      </div>

      <BaseSwitch
        label="Switch to Team View"
        isSelected={isTeamView}
        setIsSelected={onChangeViewMode}
        classNames={{
          wrapper: "justify-end w-full",
        }}
      />

      <div
        ref={containerRef}
        className="relative h-[300px] w-full items-center justify-center gap-8 rounded-md border border-gray-800 bg-neutral-800 p-3.5 md:h-[400px]"
      >
        <canvas ref={chartRef} />
        {isFetching && (
          <Skeleton className="absolute left-0 top-0 z-10 h-[300px] w-full rounded-md md:h-[400px]" />
        )}
      </div>
    </div>
  );
}
