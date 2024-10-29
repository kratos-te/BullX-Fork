"use client";

import { useState } from "react";

import { ButtonTabs } from "./ButtonTabs";

import PredictionTabControlbar from "./PredictionTabControlbar";

import { ChartViewTab } from "./ChartViewTab";
import { GameHistoriesTab } from "./GameHistoriesTab";
import { ArrowButtonGroup } from "./ArrowButtonGroup";
import LeaderboardTab from "./LeaderboardTab";

const tabItems = [
  {
    id: "chartView",
    label: "Chart View",
  },
  {
    id: "gameHistory",
    label: "Game History",
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
  },
];

export function PredictionTabs() {
  const [activeTab, setActiveTab] = useState(tabItems[0].id);
  const [isShowOnlyMyRound, setIsShowOnlyMyRound] = useState(false);

  const handleChangeActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleChangeShowOnlyMyRound = (value: boolean) => {
    setIsShowOnlyMyRound(value);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-5 md:flex-row md:justify-between">
        <ButtonTabs
          items={tabItems}
          activeTab={activeTab}
          onChangeTab={handleChangeActiveTab}
        />

        {activeTab === "gameHistory" && (
          <PredictionTabControlbar
            showOnlyMyRound={isShowOnlyMyRound}
            onChangeShowOnlyMyRound={handleChangeShowOnlyMyRound}
            onClickNext={() => {}}
            onClickPrev={() => {}}
          />
        )}
      </div>

      {activeTab === "chartView" && <ChartViewTab />}
      {activeTab === "gameHistory" && <GameHistoriesTab />}
      {activeTab === "leaderboard" && <LeaderboardTab />}

      {activeTab === "gameHistory" && (
        <div className="hidden justify-center md:flex">
          <ArrowButtonGroup onClickNext={() => {}} onClickPrev={() => {}} />
        </div>
      )}
    </div>
  );
}
