"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import { twMerge } from "tailwind-merge";
import { Badge } from "@nextui-org/react";

import TabButton from "../TabButton/TabButton";

type Button = {
  name: string;
  icon: React.ReactNode;
  url: string;
  isImplemented: boolean;
};

type TabButtonGroupProps = {
  buttons: Button[];
};

export default function TabButtonGroup({ buttons }: TabButtonGroupProps) {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="flex flex-col gap-2">
      {buttons.map((button, index) => (
        <Link key={index} href={button.url}>
          <div onClick={() => setSelected(index)}>
            <Badge
              content="WIP"
              color="danger"
              isInvisible={button.isImplemented}
            >
              <TabButton
                name={button.name}
                startContent={button.icon}
                className={twMerge(
                  selected === index &&
                    "border-1 border-solid border-[#549cfc]",
                )}
              >
                {button.name}
              </TabButton>
            </Badge>
          </div>
        </Link>
      ))}
    </div>
  );
}
