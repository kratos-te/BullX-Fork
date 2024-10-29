import TVChartContainer from "@/tizz-trade-components/TradeWidgets/TVChart/TVChartContainer";

export function ChartViewTab() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg border border-[#282834]">
      <TVChartContainer name="BTC/USD" pairIndex={0} groupIndex={0} />
    </div>
  );
}
