// icon:icon-search | Heroicons UI https://github.com/sschoger/heroicons-ui | Steve Schoger
import { SVGProps } from "./types";

function ChartGraphIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      width={width ? width : "24"}
      height={height ? height : "24"}
      viewBox="0 0 24 24"
      fill={fill ? fill : "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="vuesax/outline/status-up">
        <g id="status-up">
          <path
            id="Vector"
            d="M6.88 18.9C6.47 18.9 6.13 18.56 6.13 18.15V16.08C6.13 15.67 6.47 15.33 6.88 15.33C7.29 15.33 7.63 15.67 7.63 16.08V18.15C7.63 18.57 7.29 18.9 6.88 18.9Z"
            fill={fill ? fill : "currentColor"}
          />
          <path
            id="Vector_2"
            d="M12 18.9C11.59 18.9 11.25 18.56 11.25 18.15V14C11.25 13.59 11.59 13.25 12 13.25C12.41 13.25 12.75 13.59 12.75 14V18.15C12.75 18.57 12.41 18.9 12 18.9Z"
            fill={fill ? fill : "currentColor"}
          />
          <path
            id="Vector_3"
            d="M17.12 18.9001C16.71 18.9001 16.37 18.5601 16.37 18.1501V11.9301C16.37 11.5201 16.71 11.1801 17.12 11.1801C17.53 11.1801 17.87 11.5201 17.87 11.9301V18.1501C17.87 18.5701 17.54 18.9001 17.12 18.9001Z"
            fill={fill ? fill : "currentColor"}
          />
          <path
            id="Vector_4"
            d="M6.87995 13.18C6.53995 13.18 6.23995 12.95 6.14995 12.61C6.04995 12.21 6.28995 11.8 6.69995 11.7C10.38 10.78 13.62 8.77004 16.09 5.90004L16.55 5.36004C16.82 5.05004 17.29 5.01004 17.61 5.28004C17.92 5.55004 17.96 6.02004 17.69 6.34004L17.23 6.88004C14.56 10 11.04 12.17 7.05995 13.16C6.99995 13.18 6.93995 13.18 6.87995 13.18Z"
            fill={fill ? fill : "currentColor"}
          />
          <path
            id="Vector_5"
            d="M17.1199 9.51998C16.7099 9.51998 16.3699 9.17998 16.3699 8.76998V6.59998H14.1899C13.7799 6.59998 13.4399 6.25998 13.4399 5.84998C13.4399 5.43998 13.7799 5.09998 14.1899 5.09998H17.1199C17.5299 5.09998 17.8699 5.43998 17.8699 5.84998V8.77998C17.8699 9.18998 17.5399 9.51998 17.1199 9.51998Z"
            fill={fill ? fill : "currentColor"}
          />
          <path
            id="Vector_6"
            d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
            fill={fill ? fill : "currentColor"}
          />
        </g>
      </g>
    </svg>
  );
}

export default ChartGraphIcon;
