// icon:icon-search | Heroicons UI https://github.com/sschoger/heroicons-ui | Steve Schoger
import { SVGProps } from "./types";

function CheckIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      width={width || size || 32}
      height={height || size || 32}
      viewBox={`0 0 ${size} ${size}`}
      fill={filled ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1619_44868)">
        <path d="M40.5 0H0.5V40H40.5V0Z" fill="white" fillOpacity="0.01" />
        <path
          d="M36.3327 9.16667L14.5618 30.8333L4.66602 20.9848"
          stroke="currentColor"
          strokeWidth="3.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default CheckIcon;
