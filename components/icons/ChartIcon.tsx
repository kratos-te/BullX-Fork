import { SVGProps } from "./types";

export default function ChartIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "15"}
      height={height ? height : "10"}
      viewBox="0 0 15 10"
      fill={fill ? fill : "none"}
    >
      <path
        d="M13.125 1.875L7.875 7.125L5.875 4.125L1.875 8.125"
        stroke="#24E4A4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.625 1.875H13.125V4.375"
        stroke="#24E4A4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
