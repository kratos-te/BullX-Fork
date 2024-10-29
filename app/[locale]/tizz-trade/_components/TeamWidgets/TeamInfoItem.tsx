import { twMerge } from "tailwind-merge";

export type TeamInfoCardProps = {
  label: string;
  value: string | number;
  className?: string;
};

export function TeamInfoItem({ label, value, className }: TeamInfoCardProps) {
  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      <p className="text-sm capitalize leading-tight text-gray-400">{label}</p>
      <p className="truncate text-sm font-bold leading-tight text-white">
        {value}
      </p>
    </div>
  );
}
