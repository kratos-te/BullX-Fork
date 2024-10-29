"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

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
import { useState } from "react";

import logo from "@/assets/images/logo.png";
import TextButton from "@/components/buttons/TextButton/TextButton";
import KeyIcon from "@/components/icons/KeyIcon";
import NavArrowLeftIcon from "@/components/icons/NavArrowLeftIcon";
import NavArrowRightIcon from "@/components/icons/NavArrowRightIcon";
import NavBullIcon from "@/components/icons/NavBullIcon";
import NavNewpairsIcon from "@/components/icons/NavNewpairsIcon";
import NavPumpIcon from "@/components/icons/NavPumpIcon";
import NavExploreIcon from "@/components/icons/NavExploreIcon";
import NavAutomationIcon from "@/components/icons/NavAutomationIcon";
import NavPortfolioIcon from "@/components/icons/NavPortfolioIcon";
import NavChainsIcon from "@/components/icons/NavChainsIcon";
import NavFoldingIcon from "@/components/icons/NavFoldingIcon";
import NavWalletIcon from "@/components/icons/NavWalletIcon";

export const links = [
    {
        id: "trade",
        label: "Chains",
        isImplemented: true,
        icon: <NavChainsIcon />
    },
    {
        id: "newpairs",
        label: "New Pairs",
        isImplemented: true,
        icon: <NavNewpairsIcon />

    },
    {
        id: "pump",
        label: "Pump Vision",
        isImplemented: true,
        icon: <NavPumpIcon />
    },
    {
        id: "explore",
        label: "Explore",
        isImplemented: true,
        icon: <NavExploreIcon />
    },
    {
        id: "automation",
        label: "Automation",
        isImplemented: true,
        icon: <NavAutomationIcon />
    },
    {
        id: "portfolio",
        label: "Portfolio",
        isImplemented: true,
        icon: <NavPortfolioIcon />
    },
    {
        id: "wallet",
        label: "Wallet Manager",
        isImplemented: true,
        icon: <NavWalletIcon />
    },
];

export default function Sidebar({ pathPrefix }: { pathPrefix: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations();


    return (
        <div className="flex flex-col gap-8 pl-4 duration-250" style={{
            width: isOpen ? 250 : 60
        }}>
            <div className="h-[32px] bg-[#15171A] flex items-center justify-end">
                <div className="flex items-center gap-1 pr-2" onClick={() => setIsOpen(!isOpen)}>
                    <KeyIcon />
                    {isOpen ? <NavArrowLeftIcon /> : <NavArrowRightIcon />}
                </div>
            </div>
            <div className="flex items-start">
                <Link key={"New Pairs"} href={`/tizz-trade/newpairs`} >
                    <div className="flex items-center justify-center" >
                        <NavBullIcon />
                        {isOpen && <Image src={logo} alt="logo img" className="w-[84px] h-[32px]" />}
                    </div>
                </Link>
            </div>

            {links.map((item) => {
                return (
                    <Link key={item.label} href={`/tizz-trade/${item.id}`} className="flex items-center">
                        <Badge
                            content="WIP"
                            color="danger"
                            isInvisible={item.isImplemented}
                        >
                            <div className="flex items-center justify-center p-3">
                                {item.icon}
                            </div>
                            {isOpen && <TextButton
                                active={
                                    item.id ===
                                    pathname.replace(`${pathPrefix}/`, "").split("/")[0]
                                }
                            >
                                {t(item.label)}
                            </TextButton>}
                        </Badge>
                    </Link>
                );
            })}
        </div>
    );
}

