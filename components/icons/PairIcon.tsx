import TokenIcon from "./TokenIcon";

export type PairIconProps = {
  from: string;
  to: string;
  width: number;
  height: number;
};

export default function PairIcon({ from, to, width, height }: PairIconProps) {
  return (
    <div className="relative">
      <TokenIcon token={from} width={width} height={height} />
      {to.toLowerCase() !== "usd" ? (
        <div className="absolute bottom-0 right-0">
          <TokenIcon token={to} width={width - 10} height={height - 10} />
        </div>
      ) : null}
    </div>
  );
}
