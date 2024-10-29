import { SVGProps } from "./types";

export default function NavArrowRightIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg 
        width={width ? width : "20"}
        height={height ? height : "20"}
        viewBox="0 0 20 20" 
        fill={fill ? fill : "none"}
        xmlns="http://www.w3.org/2000/svg"
        >
    <path d="M17.5 10.5989V6.43221H4.16667C3.72464 6.43221 3.30072 6.25662 2.98816 5.94405C2.67559 5.63149 2.5 5.20757 2.5 4.76554C2.5 4.32352 2.67559 3.89959 2.98816 3.58703C3.30072 3.27447 3.72464 3.09888 4.16667 3.09888H15.8333V6.43221" stroke="#98989B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.5 4.7655V16.4322C2.5 16.8742 2.67559 17.2981 2.98816 17.6107C3.30072 17.9232 3.72464 18.0988 4.16667 18.0988H17.5V13.9322" stroke="#98989B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 10.5989C14.558 10.5989 14.134 10.7745 13.8215 11.087C13.5089 11.3996 13.3333 11.8235 13.3333 12.2655C13.3333 12.7076 13.5089 13.1315 13.8215 13.4441C14.134 13.7566 14.558 13.9322 15 13.9322H18.3333V10.5989H15Z" stroke="#98989B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

