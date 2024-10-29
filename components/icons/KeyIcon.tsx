import { SVGProps } from "./types";

export default function NavArrowLeftIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      width={width ? width : "10"}
      height={height ? height : "10"}
      viewBox="0 0 8 10"
      fill={fill ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.5 3.5V2.5C6.5 1.1 5.4 0 4 0C2.6 0 1.5 1.1 1.5 2.5V3.5C0.65 3.5 0 4.15 0 5V8.5C0 9.35 0.65 10 1.5 10H6.5C7.35 10 8 9.35 8 8.5V5C8 4.15 7.35 3.5 6.5 3.5ZM2.5 2.5C2.5 1.65 3.15 1 4 1C4.85 1 5.5 1.65 5.5 2.5V3.5H2.5V2.5Z" fill="#459C6E"/>
    </svg>
  );
}
