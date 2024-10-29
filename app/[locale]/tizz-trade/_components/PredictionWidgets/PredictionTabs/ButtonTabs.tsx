import { twMerge } from "tailwind-merge";

import Button from "@/components/buttons/Button/Button";

export type ButtonTabsProps = {
  items: { label: string; id: string }[];
  activeTab: string;
  onChangeTab(activeTab: string): void;
};

export function ButtonTabs({ items, activeTab, onChangeTab }: ButtonTabsProps) {
  return (
    <div className="flex items-center gap-2.5">
      {items.map((item) => (
        <Button
          key={item.id}
          onClick={() => onChangeTab(item.id)}
          className={twMerge(
            "h-9 rounded-md border border-[#282834] px-4 py-2.5 text-sm font-medium  shadow",
            activeTab === item.id
              ? "bg-[#ffd166] text-black"
              : "bg-[#1e1e27] text-[#9494a8]",
          )}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
