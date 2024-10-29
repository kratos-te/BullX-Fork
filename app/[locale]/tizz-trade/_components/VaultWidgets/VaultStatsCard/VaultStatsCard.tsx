"use client";

import { Address } from "viem";
import { useAccount } from "wagmi";
import { useTranslations, useFormatter } from "next-intl";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import TokenIcon from "@/components/icons/TokenIcon";

import EarnInfo, { EarnInfoItem } from "@/tizz-trade-components/Card/EarnInfo";
import { CollateralTypes, tizzContractAddresses } from "@/utils/tizz";
import { useTokenBalance } from "@/tizz-trade-hooks/useTokenBalance";
import {
  PRECISION,
  useVaultsVariables,
} from "@/tizz-trade-hooks/useVaultVariables";

type VaultStatsCardProps = {
  collateralType: CollateralTypes;
};

export default function VaultStatsCard({
  collateralType,
}: VaultStatsCardProps) {
  const t = useTranslations("Trade-VaultStatsCard");
  const format = useFormatter();

  const account = useAccount();

  const { balance, precision } = useTokenBalance({
    contractAddress: tizzContractAddresses[collateralType].tDAI as Address,
    ownerAddress: account.address,
  });

  const { shareToAssetsPrice, accPnlPerToken } =
    useVaultsVariables(collateralType);

  const items: EarnInfoItem[] = [
    {
      label: t("available"),
      value:
        balance !== undefined && precision !== undefined
          ? format.number(Number(balance) / precision)
          : "-",
      icon: (
        <TokenIcon
          token={
            collateralType === CollateralTypes.WBTC
              ? "btc"
              : collateralType.toLowerCase()
          }
          width={18}
          height={18}
        />
      ),
    },
    {
      label: t("locked"),
      value: 0,
      icon: (
        <TokenIcon
          token={
            collateralType === CollateralTypes.WBTC
              ? "btc"
              : collateralType.toLowerCase()
          }
          width={18}
          height={18}
        />
      ),
    },
    {
      label: t("total-value"),
      value:
        balance !== undefined &&
        precision !== undefined &&
        shareToAssetsPrice !== undefined
          ? format.number(
              (Number(balance) * Number(shareToAssetsPrice)) /
                precision /
                PRECISION,
            )
          : "-",
      icon: (
        <TokenIcon
          token={
            collateralType === CollateralTypes.WBTC
              ? "btc"
              : collateralType.toLowerCase()
          }
          width={18}
          height={18}
        />
      ),
    },
    {
      label: t("est-earnings"),
      value:
        balance !== undefined &&
        precision !== undefined &&
        accPnlPerToken !== undefined
          ? format.number(
              (Number(balance) * Number(accPnlPerToken)) /
                precision /
                PRECISION,
            )
          : "-",
      icon: (
        <TokenIcon
          token={
            collateralType === CollateralTypes.WBTC
              ? "btc"
              : collateralType.toLowerCase()
          }
          width={18}
          height={18}
        />
      ),
    },
  ];

  return (
    <BaseCard classNames={{ base: "p-6 bg-neutral-900" }}>
      <div className="inline-flex h-8 w-[917px] items-center justify-start gap-3.5">
        <div className="text-2xl font-semibold leading-loose text-white">
          {t("your-stats")}
        </div>
      </div>
      <div className="my-8 h-[1px] w-full bg-gray-800" />
      <div className="flex">
        {items.map((item, index) => (
          <EarnInfo key={index} item={item} />
        ))}
      </div>
    </BaseCard>
  );
}
