import { SVGProps } from "./types";

export default function YieldFarmingIcon({
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
      viewBox="0 0 32 32"
      fill={filled ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1_43)">
        <path
          d="M30.5977 8.83008L21.9102 14.3926V10.1426C21.9102 8.95508 20.5977 8.20508 19.5977 8.83008L10.9102 14.3926V2.08008C10.9102 1.26758 10.2227 0.580078 9.41016 0.580078H2.41016C1.53516 0.580078 0.910156 1.26758 0.910156 2.08008V27.0801C0.910156 27.9551 1.53516 28.5801 2.41016 28.5801H31.4102C32.2227 28.5801 32.9102 27.9551 32.9102 27.0801V10.1426C32.9102 8.95508 31.5977 8.20508 30.5977 8.83008Z"
          fill={fill ? fill : "#5700FF"}
        />
      </g>
    </svg>
  );
}
