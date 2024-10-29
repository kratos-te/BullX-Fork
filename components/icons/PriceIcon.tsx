import { SVGProps } from "./types";

export default function PriceIcon({
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
      <g clipPath="url(#clip0_1_37)">
        <path
          d="M31.9102 20.6899H4.91016V1.68994C4.91016 1.18994 4.41016 0.689941 3.91016 0.689941H1.91016C1.34766 0.689941 0.910156 1.18994 0.910156 1.68994V22.6899C0.910156 23.8149 1.78516 24.6899 2.91016 24.6899H31.9102C32.4102 24.6899 32.9102 24.2524 32.9102 23.6899V21.6899C32.9102 21.1899 32.4102 20.6899 31.9102 20.6899ZM29.9102 2.68994H22.4727C21.1602 2.68994 20.4727 4.31494 21.4102 5.25244L23.4727 7.31494L18.9102 11.8774L14.2852 7.31494C13.5352 6.50244 12.2227 6.50244 11.4727 7.31494L7.16016 11.6274C6.78516 12.0024 6.78516 12.6274 7.16016 13.0024L8.59766 14.4399C8.97266 14.8149 9.59766 14.8149 9.97266 14.4399L12.9102 11.5649L17.4727 16.1274C18.2227 16.9399 19.5352 16.9399 20.2852 16.1274L26.2852 10.1274L28.3477 12.1899C29.2852 13.1274 30.8477 12.4399 30.8477 11.1274V3.68994C30.9102 3.18994 30.4102 2.68994 29.9102 2.68994Z"
          fill={fill ? fill : "#5700FF"}
        />
      </g>
    </svg>
  );
}
