import { SVGProps } from "./types";

export default function FileUploadIcon({
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
      viewBox={`0 0 ${width ? width : "18"} ${height ? height : "18"}`}
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Capa_1">
        <path
          id="Vector"
          d="M24.7506 0H8.83203C6.24734 0 4.14453 2.10281 4.14453 4.6875V35.3125C4.14453 37.8972 6.24734 40 8.83203 40H31.1671C33.7518 40 35.8546 37.8972 35.8546 35.3125V11.1606L24.7506 0ZM25.6202 5.30469L30.5334 10.243H27.1827C26.3211 10.243 25.6202 9.54211 25.6202 8.68055V5.30469ZM31.167 36.875H8.83203C7.97047 36.875 7.26953 36.1741 7.26953 35.3125V4.6875C7.26953 3.82594 7.97047 3.125 8.83203 3.125H22.4952V8.68055C22.4952 11.2652 24.598 13.368 27.1827 13.368H32.7296V35.3125C32.7295 36.1741 32.0286 36.875 31.167 36.875ZM26.4581 22.9164L24.2484 25.1261L21.4883 22.3659V32.4219H18.3633V22.3659L15.6031 25.1261L13.3934 22.9164L19.9258 16.3841L26.4581 22.9164Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
