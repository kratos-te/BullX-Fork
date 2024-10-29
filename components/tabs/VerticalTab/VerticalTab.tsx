"use client";

import { Link } from "@/navigation";
import { usePathname } from "@/navigation";

export type VerticalTabItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export type VerticalTabItemProps = {
  items: VerticalTabItem[];
  pathPrefix: string;
};

export default function VerticalTab({
  items,
  pathPrefix,
}: VerticalTabItemProps) {
  const pathname = usePathname();
  return (
    <div className="flex w-full flex-col gap-1">
      {items.map((item, index) => (
        <Link key={item.id} href={`/tizz-trade/stats/${item.id}`}>
          <div
            key={index}
            className={`flex h-10 cursor-pointer items-center gap-1 rounded-md px-3 py-1 ${item.id === pathname.replace(`${pathPrefix}/`, "").split("/")[0] ? "bg-amber-300 text-stone-700" : "text-gray-400"}`}
          >
            {item.icon}
            <div className="grow basis-0 text-sm font-semibold ">
              {item.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
