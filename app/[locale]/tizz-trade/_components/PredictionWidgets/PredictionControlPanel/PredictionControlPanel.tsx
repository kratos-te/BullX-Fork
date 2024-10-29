import { NextRoundPrediction } from "./NextRoundPrediction";
import { PredictForm } from "./PredictForm";

export function PredictionControlPanel() {
  return (
    <div className="z-0 flex w-full max-w-[624px] flex-col gap-3.5 rounded-[14px] border border-[#282834] bg-[#14141a] px-3 py-4 lg:px-[18px] lg:py-6">
      <NextRoundPrediction
        predictionId={12345}
        lockedPrize={123000}
        prizePool={2.841}
        upPayoud={1.23}
        downPayout={2.32}
      />

      <PredictForm />
    </div>
  );
}
