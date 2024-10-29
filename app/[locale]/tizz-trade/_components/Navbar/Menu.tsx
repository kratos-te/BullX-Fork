"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Badge,
} from "@nextui-org/react";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { useTranslations } from "next-intl";

import menuSrc from "@/assets/icons/menu-icon.svg";

import { links } from "./TopNavbar";

function unfoldLink(
  links: {
    id: string;
    label: string;
    subLink?: {
      id: string;
      label: string;
      icon: JSX.Element;
    }[];
    isImplemented: boolean;
  }[],
) {
  return links
    .map((item) =>
      item.subLink
        ? item.subLink.map((item) => ({ id: item.id, label: item.label }))
        : [{ id: item.id, label: item.label }],
    )
    .reduce(
      (acc, item) => [...acc, ...item],
      [] as { id: string; label: string }[],
    );
}

export default function Menu() {
  const t = useTranslations();
  const { openAccountModal } = useAccountModal();
  const account = useAccount();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light" className="lg:hidden">
          <Image src={menuSrc} alt="menu icon" width={24} height={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownSection>
          {unfoldLink(links).map((item) => {
            return (
              <DropdownItem key={item.id}>
                <Link key={item.label} href={`/tizz-trade/${item.id}`}>
                  {t(item.label)}
                </Link>
              </DropdownItem>
            );
          })}
        </DropdownSection>
        <DropdownSection title="Wallet">
          <DropdownItem
            key="wallet"
            className="text-amber-400"
            onClick={openAccountModal}
          >
            {account.address?.substring(0, 7) || "Not connected"}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
