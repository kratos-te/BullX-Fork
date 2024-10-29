"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/navigation";
import { usePathname } from "@/navigation";

import {
  Badge,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import ChevronDown from "@/components/icons/ChevronDown";
import TextButton from "@/components/buttons/TextButton/TextButton";
import ArrowRightIcon from "@/components/icons/arrow/ArrowRightIcon";

import AwardIcon from "@/components/icons/AwardIcon";
import StatsIcon from "@/components/icons/StatsIcon";
import FaucetIcon from "@/components/icons/content/FaucentIcon";

export const links = [
  {
    id: "trade",
    label: "Trade-TopNavbar.trade",
    isImplemented: true,
  },
  {
    id: "prediction",
    label: "Trade-TopNavbar.prediction",
    isImplemented: true,
  },
  {
    id: "portfolio",
    label: "Trade-TopNavbar.portfolio",
    isImplemented: true,
  },

  {
    id: "vault",
    label: "Trade-TopNavbar.vault",
    isImplemented: true,
  },
  {
    id: "team",
    label: "Trade-TopNavbar.team",
    isImplemented: true,
  },
  {
    id: "more",
    label: "Trade-TopNavbar.more",
    subLink: [
      {
        id: "stats",
        label: "Trade-TopNavbar.stats",
        icon: <StatsIcon />,
      },
      {
        id: "leaderboard",
        label: "Trade-TopNavbar.leaderboard",
        icon: <AwardIcon />,
      },
      {
        id: "faucet",
        label: "Trade-TopNavbar.faucet",
        icon: <FaucetIcon width={24} height={24} size={512} />,
      },
    ],
    isImplemented: true,
  },
];

export default function TopNavbar({ pathPrefix }: { pathPrefix: string }) {
  const pathname = usePathname();

  const t = useTranslations();

  return (
    <div className="hidden flex-1 items-center lg:flex">
      {links.map((item) => {
        if (item.subLink) {
          const active = pathname
            .replace(`${pathPrefix}/`, "")
            .split("/")
            .includes(item.id);
          return (
            <div key={item.id}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    className={twMerge(
                      "rounded p-3 text-[15px] font-bold text-gray-400",
                      active
                        ? "bg-transparent text-amber-300"
                        : "bg-transparent",
                    )}
                    endContent={<ChevronDown />}
                  >
                    {t("Trade-TopNavbar.more")}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu with icons"
                >
                  {item.subLink.map((sub) => (
                    <DropdownItem key={sub.label} startContent={sub.icon}>
                      <Link
                        key={sub.label}
                        href={`/tizz-trade/${sub.id}`}
                        className="group flex items-center justify-between"
                      >
                        {t(sub.label)}
                        <ArrowRightIcon
                          size={16}
                          className="hidden text-[16px] group-hover:block"
                        />
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        }
        return (
          <Link key={item.label} href={`/tizz-trade/${item.id}`}>
            <Badge
              content="WIP"
              color="danger"
              isInvisible={item.isImplemented}
            >
              <TextButton
                active={
                  item.id ===
                  pathname.replace(`${pathPrefix}/`, "").split("/")[0]
                }
              >
                {t(item.label)}
              </TextButton>
            </Badge>
          </Link>
        );
      })}
    </div>
  );
}
