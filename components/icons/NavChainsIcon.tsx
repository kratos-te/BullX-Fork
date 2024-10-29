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
            <path d="M9.68793 2.74048C11.4526 0.975828 14.3137 0.975828 16.0784 2.74048C17.8429 4.50516 17.8429 7.36624 16.0784 9.13089L12.8831 12.3261L6.49274 5.93568L9.68793 2.74048Z" fill="#98989B" />
            <path d="M8.75223 16.4614C6.98757 18.2261 4.12649 18.2261 2.36183 16.4614C0.597162 14.6967 0.597162 11.8357 2.36183 10.071L5.55705 6.87585L11.9474 13.2662L8.75223 16.4614Z" fill="#98989B" />
        </svg>
    );
}

