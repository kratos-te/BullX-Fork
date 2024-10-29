import { SVGProps } from "../types";

export default function ArrowDownIcon({
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
      <path
        d="M9.99977 14C9.41644 14 8.83311 13.775 8.39144 13.3334L2.95811 7.90003C2.71644 7.65837 2.71644 7.25837 2.95811 7.0167C3.19977 6.77503 3.59977 6.77503 3.84144 7.0167L9.27477 12.45C9.67477 12.85 10.3248 12.85 10.7248 12.45L16.1581 7.0167C16.3998 6.77503 16.7998 6.77503 17.0414 7.0167C17.2831 7.25837 17.2831 7.65837 17.0414 7.90003L11.6081 13.3334C11.1664 13.775 10.5831 14 9.99977 14Z"
        fill="currentColor"
      />
    </svg>
  );
}
