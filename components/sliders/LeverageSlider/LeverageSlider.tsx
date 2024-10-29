"use client";

import { Slider, SliderProps } from "@nextui-org/react";

const marks = [
  {
    value: 2,
    label: "2",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 75,
    label: "75",
  },
  {
    value: 100,
    label: "100",
  },
  {
    value: 125,
    label: "125",
  },
  {
    value: 150,
    label: "150",
  },
];

export type LeverageSliderProps = SliderProps & {};

export default function LeverageSlider({
  value,
  onChange,
  ...rest
}: LeverageSliderProps) {
  return (
    <Slider
      size="sm"
      step={1}
      aria-label="LeverageSlider"
      marks={marks}
      label={<div></div>}
      maxValue={150}
      minValue={2}
      value={value}
      onChange={onChange}
      color="foreground"
      classNames={{
        base: "max-w-md",
        filler: "bg-gradient-to-r from-[#6FFFCF] to-[#29CBF8]",
        labelWrapper: "mb-2 justify-center",
        label: "font-medium text-default-700 text-medium",
        value: "hidden",
        thumb: [
          "transition-size",
          "bg-gradient-to-r from-slate-300 to-slate-300",
          "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
          "data-[dragging=true]:w-4 data-[dragging=true]:h-4 data-[dragging=true]:after:h-3 data-[dragging=true]:after:w-3",
        ],
        step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-[#232630] h-[12px] w-[3px]",
        mark: "text-[11px] text-[#82828f]",
        track: "rounded-none border-none h-[2px]",
        trackWrapper: "w-[97%] ml-[10px]",
      }}
      renderThumb={(props) => (
        <div
          {...props}
          className="group top-1/2 cursor-grab rounded-full border-small border-default-200 bg-background p-0 shadow-medium data-[dragging=true]:cursor-grabbing dark:border-default-400/50"
        >
          <span className="block h-4 w-4 rounded-full bg-gradient-to-br from-slate-300 to-slate-300 shadow-small transition-transform group-data-[dragging=true]:scale-80" />
        </div>
      )}
      {...rest}
    />
  );
}
