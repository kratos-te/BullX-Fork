import { SVGProps } from "../types";

export default function PercentageSqure({
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
        d="M16.94 2H8.56C4.92 2 2.75 4.17 2.75 7.81V16.18C2.75 19.83 4.92 22 8.56 22H16.93C20.57 22 22.74 19.83 22.74 16.19V7.81C22.75 4.17 20.58 2 16.94 2ZM8.5 9.14C8.5 8.33 9.16 7.66 9.98 7.66C10.79 7.66 11.46 8.32 11.46 9.14C11.46 9.95 10.8 10.62 9.98 10.62C9.16 10.61 8.5 9.95 8.5 9.14ZM9.57 16.02C9.38 16.02 9.19 15.95 9.04 15.8C8.75 15.51 8.75 15.04 9.04 14.74L15.59 8.19C15.88 7.9 16.36 7.9 16.65 8.19C16.94 8.48 16.94 8.96 16.65 9.25L10.1 15.8C9.95 15.95 9.76 16.02 9.57 16.02ZM16.52 16.34C15.71 16.34 15.04 15.68 15.04 14.86C15.04 14.05 15.7 13.38 16.52 13.38C17.33 13.38 18 14.04 18 14.86C18 15.68 17.34 16.34 16.52 16.34Z"
        fill="currentColor"
      />
    </svg>
  );
}
