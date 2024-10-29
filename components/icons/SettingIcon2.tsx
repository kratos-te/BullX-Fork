import { SVGProps } from "./types";

export default function SettingIcon2({
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
      <path
        d="M12.6667 15.1668C12.3934 15.1668 12.1667 14.9402 12.1667 14.6668V7.3335C12.1667 7.06016 12.3934 6.8335 12.6667 6.8335C12.9401 6.8335 13.1667 7.06016 13.1667 7.3335V14.6668C13.1667 14.9402 12.9401 15.1668 12.6667 15.1668Z"
        fill={fill ? fill : "#BCDCDB"}
      />
      <path
        d="M12.6667 5.16683C12.3934 5.16683 12.1667 4.94016 12.1667 4.66683V1.3335C12.1667 1.06016 12.3934 0.833496 12.6667 0.833496C12.9401 0.833496 13.1667 1.06016 13.1667 1.3335V4.66683C13.1667 4.94016 12.9401 5.16683 12.6667 5.16683Z"
        fill={fill ? fill : "#BCDCDB"}
      />
      <path
        d="M8 15.1668C7.72667 15.1668 7.5 14.9402 7.5 14.6668V11.3335C7.5 11.0602 7.72667 10.8335 8 10.8335C8.27333 10.8335 8.5 11.0602 8.5 11.3335V14.6668C8.5 14.9402 8.27333 15.1668 8 15.1668Z"
        fill={fill ? fill : "#BCDCDB"}
      />
      <path
        d="M8 9.16683C7.72667 9.16683 7.5 8.94016 7.5 8.66683V1.3335C7.5 1.06016 7.72667 0.833496 8 0.833496C8.27333 0.833496 8.5 1.06016 8.5 1.3335V8.66683C8.5 8.94016 8.27333 9.16683 8 9.16683Z"
        fill={fill ? fill : "#BCDCDB"}
      />
      <path
        d="M3.33325 15.1668C3.05992 15.1668 2.83325 14.9402 2.83325 14.6668V7.3335C2.83325 7.06016 3.05992 6.8335 3.33325 6.8335C3.60659 6.8335 3.83325 7.06016 3.83325 7.3335V14.6668C3.83325 14.9402 3.60659 15.1668 3.33325 15.1668Z"
        fill={fill ? fill : "#BCDCDB"}
      />
      <path
        d="M3.33325 5.16683C3.05992 5.16683 2.83325 4.94016 2.83325 4.66683V1.3335C2.83325 1.06016 3.05992 0.833496 3.33325 0.833496C3.60659 0.833496 3.83325 1.06016 3.83325 1.3335V4.66683C3.83325 4.94016 3.60659 5.16683 3.33325 5.16683Z"
        fill={fill ? fill : "#BCDCDB"}
      />
      <path
        d="M4.66667 7.8335H2C1.72667 7.8335 1.5 7.60683 1.5 7.3335C1.5 7.06016 1.72667 6.8335 2 6.8335H4.66667C4.94 6.8335 5.16667 7.06016 5.16667 7.3335C5.16667 7.60683 4.94 7.8335 4.66667 7.8335Z"
        fill={fill ? fill : "#BCDCDB"}
      />
      <path
        d="M13.9999 7.8335H11.3333C11.0599 7.8335 10.8333 7.60683 10.8333 7.3335C10.8333 7.06016 11.0599 6.8335 11.3333 6.8335H13.9999C14.2733 6.8335 14.4999 7.06016 14.4999 7.3335C14.4999 7.60683 14.2733 7.8335 13.9999 7.8335Z"
        fill={fill ? fill : "#BCDCDB"}
      />
      <path
        d="M9.33341 9.1665H6.66675C6.39341 9.1665 6.16675 8.93984 6.16675 8.6665C6.16675 8.39317 6.39341 8.1665 6.66675 8.1665H9.33341C9.60675 8.1665 9.83341 8.39317 9.83341 8.6665C9.83341 8.93984 9.60675 9.1665 9.33341 9.1665Z"
        fill={fill ? fill : "#BCDCDB"}
      />
    </svg>
  );
}
