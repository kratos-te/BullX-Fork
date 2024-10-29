import { CurrentPrediction } from "@/tizz-trade-components/PredictionWidgets/CurrentPrediction/CurrentPrediction";
import { PredictionControlPanel } from "@/tizz-trade-components/PredictionWidgets/PredictionControlPanel/PredictionControlPanel";
import { PredictionTabs } from "@/tizz-trade-components/PredictionWidgets/PredictionTabs/PredictionTabs";
import { StatusCardsBar } from "@/tizz-trade-components/PredictionWidgets/StatusCardsBar/StatusCardsBar";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <CurrentPrediction />
        <PredictionControlPanel />
      </div>
      <StatusCardsBar />
      <PredictionTabs />
    </div>
  );
}
