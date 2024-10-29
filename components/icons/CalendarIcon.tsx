import { SVGProps } from "./types";

export default function CalendarIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      width={width ? width : "18"}
      height={height ? height : "18"}
      viewBox="0 0 18 18"
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="vuesax/linear/calendar">
        <g id="calendar">
          <path
            id="Vector"
            d="M6 1.5V3.75"
            stroke={fill ? fill : "currentColor"}
            strokeWidth="1.125"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M12 1.5V3.75"
            stroke={fill ? fill : "currentColor"}
            strokeWidth="1.125"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_3"
            d="M2.625 6.81738H15.375"
            stroke={fill ? fill : "currentColor"}
            strokeWidth="1.125"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_4"
            d="M15.75 6.375V12.75C15.75 15 14.625 16.5 12 16.5H6C3.375 16.5 2.25 15 2.25 12.75V6.375C2.25 4.125 3.375 2.625 6 2.625H12C14.625 2.625 15.75 4.125 15.75 6.375Z"
            stroke={fill ? fill : "currentColor"}
            strokeWidth="1.125"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_5"
            d="M11.7713 10.2754H11.778"
            stroke={fill ? fill : "currentColor"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_6"
            d="M11.7713 12.5254H11.778"
            stroke={fill ? fill : "currentColor"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_7"
            d="M8.99686 10.2754H9.00359"
            stroke={fill ? fill : "currentColor"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_8"
            d="M8.99686 12.5254H9.00359"
            stroke={fill ? fill : "currentColor"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_9"
            d="M6.22049 10.2754H6.22723"
            stroke={fill ? fill : "currentColor"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_10"
            d="M6.22049 12.5254H6.22723"
            stroke={fill ? fill : "currentColor"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
