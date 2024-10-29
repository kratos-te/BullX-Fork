// icon:icon-search | Heroicons UI https://github.com/sschoger/heroicons-ui | Steve Schoger
import { SVGProps } from "./types";

function CloseIcon({
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
      width={width ? width : "24"}
      height={height ? height : "24"}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      {...props}
    >
      <path
        d="M18 6L6 18"
        stroke={fill ? fill : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke={fill ? fill : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CloseIcon;
