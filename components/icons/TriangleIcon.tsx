import { SVGProps } from "./types";

export default function TriangleIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || "9"}
      height={size || height || "14"}
      fill={filled ? fill : "none"}
      viewBox="0 0 9 14"
      {...props}
    >
      <path
        d="M4.00703 10.2428C4.34882 10.5846 4.9039 10.5846 5.2457 10.2428L8.7457 6.74277C8.99726 6.49121 9.07109 6.1166 8.93437 5.78848C8.79765 5.46035 8.48046 5.24707 8.125 5.24707L1.125 5.2498C0.772262 5.2498 0.45234 5.46309 0.315621 5.79121C0.178903 6.11934 0.255465 6.49395 0.504293 6.74551L4.00429 10.2455L4.00703 10.2428Z"
        fill={fill ? fill : "#ADADBB"}
      />
    </svg>
  );
}
