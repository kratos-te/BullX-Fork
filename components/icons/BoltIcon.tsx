import { SVGProps } from "./types";

export default function BoltIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      fill="none"
      stroke={fill ? fill : "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height={height ? height : "1em"}
      width={width ? width : "1em"}
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M13 3v7h6l-8 11v-7H5l8-11" />
    </svg>
  );
}
