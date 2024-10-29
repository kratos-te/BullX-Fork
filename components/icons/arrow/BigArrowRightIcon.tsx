import { SVGProps } from "../types";

export default function BigArrowRightIcon({
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
        d="M19.2389 25.5041C18.9855 25.5041 18.7322 25.4108 18.5322 25.2108C18.1455 24.8241 18.1455 24.1841 18.5322 23.7975L25.9189 16.4108L18.5322 9.02413C18.1455 8.63747 18.1455 7.99747 18.5322 7.6108C18.9189 7.22413 19.5589 7.22413 19.9455 7.6108L28.0389 15.7041C28.4255 16.0908 28.4255 16.7308 28.0389 17.1175L19.9455 25.2108C19.7455 25.4108 19.4922 25.5041 19.2389 25.5041Z"
        fill="currentColor"
      />
      <path
        d="M27.108 17.4106H4.66797C4.1213 17.4106 3.66797 16.9573 3.66797 16.4106C3.66797 15.864 4.1213 15.4106 4.66797 15.4106H27.108C27.6546 15.4106 28.108 15.864 28.108 16.4106C28.108 16.9573 27.6546 17.4106 27.108 17.4106Z"
        fill="currentColor"
      />
    </svg>
  );
}
