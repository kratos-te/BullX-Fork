import { SVGProps } from "../types";

export default function BigArrowLeftIcon({
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
        d="M12.7619 25.5041C12.5085 25.5041 12.2552 25.4108 12.0552 25.2108L3.96188 17.1175C3.57521 16.7308 3.57521 16.0908 3.96188 15.7041L12.0552 7.6108C12.4419 7.22413 13.0819 7.22413 13.4685 7.6108C13.8552 7.99747 13.8552 8.63747 13.4685 9.02413L6.08187 16.4108L13.4685 23.7975C13.8552 24.1841 13.8552 24.8241 13.4685 25.2108C13.2819 25.4108 13.0152 25.5041 12.7619 25.5041Z"
        fill="currentColor"
      />
      <path
        d="M27.3345 17.4106H4.89453C4.34786 17.4106 3.89453 16.9573 3.89453 16.4106C3.89453 15.864 4.34786 15.4106 4.89453 15.4106H27.3345C27.8812 15.4106 28.3345 15.864 28.3345 16.4106C28.3345 16.9573 27.8812 17.4106 27.3345 17.4106Z"
        fill="currentColor"
      />
    </svg>
  );
}
