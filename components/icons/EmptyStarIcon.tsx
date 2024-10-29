// icon:star | System UIcons https://systemuicons.com/ | Corey Ginnivan
import { SVGProps } from "./types";

function EmptyStarIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      viewBox="0 0 21 21"
      fill={fill ? fill : "currentColor"}
      height={height ? height : "1em"}
      width={width ? width : "1em"}
      {...props}
    >
      <path
        fill="none"
        stroke={fill ? fill : "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 14.5l-5 3 2-5.131-4-3.869h5l2-5 2 5h5l-4 4 2 5z"
      />
    </svg>
  );
}

export default EmptyStarIcon;
