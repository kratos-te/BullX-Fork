import { SVGProps } from "../types";

export default function XIcon({
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
      <g clipPath="url(#clip0_4899_1428)">
        <path
          d="M18.8263 1.90405H22.1998L14.8297 10.3275L23.5 21.79H16.7112L11.394 14.8381L5.30995 21.79H1.93443L9.81744 12.7801L1.5 1.90405H8.46111L13.2674 8.25838L18.8263 1.90405ZM17.6423 19.7708H19.5116L7.44539 3.81718H5.43946L17.6423 19.7708Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
