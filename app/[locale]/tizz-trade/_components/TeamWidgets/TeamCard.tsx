"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

import teamPic from "@/assets/images/zentoshi/teamTrader.svg";
import tizzMascotProfileSrc from "@/assets/images/zentoshi/tizz-mascot-profile.svg";
import { IGuildWithAggregation } from "@/types/index";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import CustomImage from "@/components/image/CustomImage";

export type TeamCardItemProps = {
  guild: IGuildWithAggregation;
};

export default function TeamCard({ guild }: TeamCardItemProps) {
  const t = useTranslations("Trade-TeamCard");

  return (
    <Link href={`/tizz-trade/team/overview/${guild.guild_id}`}>
      <BaseCard
        classNames={{
          base: "flex-row justify-between gap-3 bg-neutral-800 p-3.5",
        }}
      >
        <div className="flex gap-3">
          <CustomImage
            src={guild.picture}
            defaultSrc={teamPic}
            width={48}
            height={48}
            className="h-[48px] w-[48px] rounded-full"
            alt="team picture"
          />
          <div>
            <p className="text-base font-semibold text-white">{guild.name}</p>
            <p className="text-sm leading-tight text-gray-400">
              {`Rank: ${guild.rank}`}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs leading-[18px] text-gray-400">
            {t("members")} {`${guild.guildMembers.length || 0}`}
          </p>
          <div className="flex items-center">
            <Image
              src={tizzMascotProfileSrc}
              width={20}
              height={20}
              className="h-[20px] w-[20px]"
              alt="Avatar1"
            />
            <div className="ml-[-5px] h-[20px] w-[20px] rounded-2xl bg-white text-center text-sm text-black">
              {guild.guildMembers.length || 0}
            </div>
            <p className="ml-1 text-lg font-semibold leading-[20px]">+</p>
          </div>
        </div>
      </BaseCard>
    </Link>
  );
}
