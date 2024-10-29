import { SVGProps } from "../types";

export default function ArrowRightIcon({
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
        d="M5.33064 12.487C5.22252 12.487 5.1144 12.4471 5.02904 12.3618C4.86402 12.1967 4.86402 11.9236 5.02904 11.7586L8.73923 8.04839C9.01237 7.77524 9.01237 7.33139 8.73923 7.05824L5.02904 3.34805C4.86402 3.18303 4.86402 2.90989 5.02904 2.74486C5.19407 2.57984 5.46721 2.57984 5.63223 2.74486L9.34242 6.45505C9.63264 6.74527 9.79766 7.13791 9.79766 7.55331C9.79766 7.96872 9.63833 8.36136 9.34242 8.65158L5.63223 12.3618C5.54687 12.4414 5.43876 12.487 5.33064 12.487Z"
        fill="currentColor"
      />
    </svg>
  );
}
