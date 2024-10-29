"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import BaseSwitch from "@/components/switchs/BaseSwitch/BaseSwitch";
import PercentageSelector, {
  PercentageSelectorItem,
} from "@/components/selects/PercentageSelector/PercentageSelector";
import BorderedInput from "@/components/inputs/BorderedInput/BorderedInput";
import { getPercentageStr } from "@/utils/price";

export type SLTPPanelProps = {
  price: number;
  leverage: number;
  isLong: boolean;
  stopLoss: string;
  takeProfit: string;
  onChangeStopLoss(value: string): void;
  onChangeTakeProfit(value: string): void;
};

export default function SLTPPanel({
  price,
  leverage,
  isLong,
  stopLoss,
  takeProfit,
  onChangeStopLoss,
  onChangeTakeProfit,
}: SLTPPanelProps) {
  const t = useTranslations("Trade-SLTPPanel");

  const maxProfitPercentage = Math.min(100 * leverage, 900);

  const lossItems: PercentageSelectorItem[] = [
    {
      id: "0",
      label: t("unset"),
    },
    {
      id: "-10",
      label: "-10%",
    },
    {
      id: "-25",
      label: "-25%",
    },
    {
      id: "-50",
      label: "-50%",
    },
    {
      id: "-75",
      label: "-75%",
    },
    {
      id: "-100",
      label: t("none"),
    },
  ];

  const profitItems: PercentageSelectorItem[] = [
    {
      id: "0",
      label: t("unset"),
    },
    {
      id: "25",
      label: "25%",
    },
    {
      id: "50",
      label: "50%",
    },
    {
      id: "100",
      label: "100%",
    },
    {
      id: "300",
      label: "300%",
      className:
        maxProfitPercentage < 300 && !isLong
          ? "line-through cursor-not-allowed"
          : undefined,
    },
    {
      id: "899.5",
      label: "900%",
      className:
        maxProfitPercentage < 900 && !isLong
          ? "line-through cursor-not-allowed"
          : undefined,
    },
  ];

  const [isFirstSelected, setIsFirstSelected] = useState<boolean>(false);
  const [isSecondSelected, setIsSecondSelected] = useState<boolean>(false);
  const [slPercentage, setSlPercentage] = useState<string>(lossItems[5].id);
  const [tpPercentage, setTpPercentage] = useState<string>(profitItems[5].id);

  useEffect(() => {
    if (slPercentage === "0") {
      return;
    }

    if (slPercentage === "-100") {
      onChangeStopLoss("0");
      return;
    }

    const percentage = +slPercentage;

    onChangeStopLoss(
      `${Math.max(price + ((isLong ? 1 : -1) * price * percentage) / 100 / leverage, 0)}`,
    );
  }, [isLong, leverage, onChangeStopLoss, price, slPercentage]);

  useEffect(() => {
    if (tpPercentage === "0") {
      return;
    }

    const percentage = +tpPercentage;

    onChangeTakeProfit(
      `${price + ((isLong ? 1 : -1) * price * percentage) / 100 / leverage}`,
    );
  }, [isLong, leverage, onChangeTakeProfit, price, tpPercentage]);

  const handleChangeStopLossPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value)) {
      onChangeStopLoss(e.target.value);
      setSlPercentage("0");
    }
  };

  const handleChangeTakeProfitPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^([0-9]+(?:[.,][0-9]*)?)$/.test(e.target.value)) {
      onChangeTakeProfit(e.target.value);
      setTpPercentage("0");
    }
  };

  const handleChangeStopLossPercentage = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const key =
      e.target.value === "" ? lossItems[0].id : (e.target.value as string);
    setSlPercentage(key);

    if (key === "0") {
      onChangeStopLoss("");
    }
  };

  const handleChangeTakeProfitPercentage = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const key =
      e.target.value === "" ? profitItems[0].id : (e.target.value as string);

    if (+key > maxProfitPercentage && !isLong) {
      return;
    }

    setTpPercentage(key);

    if (key === "0") {
      onChangeTakeProfit("");
    }
  };

  const slP = !Number.isNaN(stopLoss)
    ? ((isLong ? 1 : -1) * (+stopLoss - price) * 100 * leverage) / price
    : 0;

  const tpP = !Number.isNaN(takeProfit)
    ? ((isLong ? 1 : -1) * (+takeProfit - price) * 100 * leverage) / price
    : 0;

  return (
    <div
      className={twMerge(
        "flex gap-6 border-b border-t border-gray-800 py-6",
        (isFirstSelected || isSecondSelected) && "flex-col",
      )}
    >
      <div className="flex flex-col gap-2">
        <BaseSwitch
          label={t("stop-loss")}
          isSelected={isFirstSelected}
          setIsSelected={setIsFirstSelected}
        />
        {isFirstSelected && (
          <div className="flex gap-2">
            <BorderedInput
              type="text"
              labelPlacement="outside"
              placeholder={t("stop-lose-price")}
              value={stopLoss}
              onChange={handleChangeStopLossPrice}
              endContent={
                stopLoss === "0" ? (
                  <span className="text-gray-400/60">{t("none")}</span>
                ) : (
                  <span
                    className={twMerge(
                      "text-gray-400/60",
                      (slP < -100 || slP > 0) && "line-through",
                    )}
                  >
                    {slP < -100
                      ? "-100%"
                      : slP > 900
                        ? "+900%"
                        : `${getPercentageStr(slP)}%`}
                  </span>
                )
              }
              size="sm"
            />
            <PercentageSelector
              items={lossItems}
              selectedKeys={[slPercentage]}
              onChange={handleChangeStopLossPercentage}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <BaseSwitch
          label={t("take-profit")}
          isSelected={isSecondSelected}
          setIsSelected={setIsSecondSelected}
        />
        {isSecondSelected && (
          <div className="flex gap-2">
            <BorderedInput
              type="text"
              labelPlacement="outside"
              placeholder={+takeProfit > 0 ? t("take-profit-price") : "0.00000"}
              value={+takeProfit > 0 ? takeProfit : ""}
              onChange={handleChangeTakeProfitPrice}
              classNames={{ input: "placeholder:line-through" }}
              endContent={
                <span
                  className={twMerge(
                    "text-gray-400/60",
                    (tpP < 0 ||
                      tpP > 900 ||
                      (+tpPercentage > maxProfitPercentage && !isLong)) &&
                      "line-through",
                  )}
                >
                  {tpP < -100
                    ? "-100%"
                    : tpP > 900
                      ? "+900%"
                      : `${getPercentageStr(tpP)}%`}
                </span>
              }
              size="sm"
            />
            <PercentageSelector
              items={profitItems}
              selectedKeys={[tpPercentage]}
              onChange={handleChangeTakeProfitPercentage}
              classNames={{
                value:
                  maxProfitPercentage < +tpPercentage && !isLong
                    ? "line-through"
                    : undefined,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
