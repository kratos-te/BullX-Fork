import { SVGProps } from "./types";

export default function DotIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      width={width ? width : "9"}
      height={height ? height : "8"}
      viewBox="0 0 9 8"
      fill={fill ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="4.33301" cy="4" r="4" fill={fill ? fill : "currentColor"} />
    </svg>
  );
}
