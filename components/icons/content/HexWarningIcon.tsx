import { SVGProps } from "../types";

export default function HexWarningIcon({
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
        d="M10 11.4585C9.65833 11.4585 9.375 11.1752 9.375 10.8335V6.4585C9.375 6.11683 9.65833 5.8335 10 5.8335C10.3417 5.8335 10.625 6.11683 10.625 6.4585V10.8335C10.625 11.1752 10.3417 11.4585 10 11.4585Z"
        fill="currentColor"
      />
      <path
        d="M10.0003 14.375C9.77533 14.375 9.56697 14.2917 9.40864 14.1334C9.33364 14.05 9.27533 13.9584 9.22533 13.8584C9.18366 13.7584 9.16699 13.65 9.16699 13.5417C9.16699 13.325 9.25864 13.1083 9.40864 12.95C9.71697 12.6417 10.2837 12.6417 10.592 12.95C10.742 13.1083 10.8337 13.325 10.8337 13.5417C10.8337 13.65 10.8086 13.7584 10.767 13.8584C10.7253 13.9584 10.667 14.05 10.592 14.1334C10.4337 14.2917 10.2253 14.375 10.0003 14.375Z"
        fill="currentColor"
      />
      <path
        d="M9.99983 18.9584C9.44149 18.9584 8.87482 18.8167 8.37482 18.5251L3.42481 15.6667C2.42481 15.0834 1.7998 14.0084 1.7998 12.8501V7.1501C1.7998 5.99176 2.42481 4.91676 3.42481 4.33342L8.37482 1.4751C9.37482 0.891764 10.6165 0.891764 11.6248 1.4751L16.5748 4.33342C17.5748 4.91676 18.1998 5.99176 18.1998 7.1501V12.8501C18.1998 14.0084 17.5748 15.0834 16.5748 15.6667L11.6248 18.5251C11.1248 18.8167 10.5582 18.9584 9.99983 18.9584ZM9.99983 2.29175C9.65816 2.29175 9.30815 2.38342 8.99982 2.55842L4.04981 5.41675C3.43315 5.77508 3.0498 6.43343 3.0498 7.1501V12.8501C3.0498 13.5584 3.43315 14.2251 4.04981 14.5834L8.99982 17.4417C9.61648 17.8001 10.3832 17.8001 10.9915 17.4417L15.9415 14.5834C16.5582 14.2251 16.9415 13.5667 16.9415 12.8501V7.1501C16.9415 6.44176 16.5582 5.77508 15.9415 5.41675L10.9915 2.55842C10.6915 2.38342 10.3415 2.29175 9.99983 2.29175Z"
        fill="currentColor"
      />
    </svg>
  );
}
