"use client";

import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/navigation";

import BaseCard from "@/components/cards/BaseCard/BaseCard";
import { CollateralTypes } from "@/utils/tizz";
import TokenIcon from "@/components/icons/TokenIcon";
import {
  useVaultsVariables,
  PRECISION,
} from "@/tizz-trade-hooks/useVaultVariables";

export type VaultLinkProps = {
  collateralType: CollateralTypes;
};

export function VaultLink({ collateralType }: VaultLinkProps) {
  const t = useTranslations("Trade-VaultLink");
  const format = useFormatter();

  const { tvl, shareToAssetsPrice } = useVaultsVariables(collateralType);

  const vaultItems = [
    {
      label: t("deposit"),
      value: collateralType,
      isSuffixIcon: false,
    },
    {
      label: "TVL",
      value: tvl !== undefined ? format.number(Number(tvl) / PRECISION) : "-",
      isSuffixIcon: true,
    },
    {
      label: `tz${collateralType} ${t("price")}`,
      value:
        shareToAssetsPrice !== undefined
          ? format.number(Number(shareToAssetsPrice) / PRECISION)
          : "-",
      isSuffixIcon: true,
    },
  ];

  return (
    <Link href={`/tizz-trade/vault/${collateralType}`}>
      <BaseCard classNames={{ base: "p-6 bg-neutral-900 gap-2" }}>
        <div className="flex items-center gap-2">
          <TokenIcon
            token={
              collateralType === CollateralTypes.WBTC
                ? "btc"
                : collateralType.toLowerCase()
            }
            width={24}
            height={24}
          />
          <p className="text-xl font-black text-stone-200">
            tz{collateralType}
          </p>
          <span className="rounded border border-emerald-500/20 bg-emerald-400/30 px-2 py-[1px] text-sm font-light text-emerald-400">
            {`Coming soon...% APY`}
          </span>
        </div>
        <div className="flex items-center gap-10">
          {vaultItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="flex gap-1 text-base font-bold text-stone-200">
                {!item.isSuffixIcon && (
                  <TokenIcon
                    token={
                      collateralType === CollateralTypes.WBTC
                        ? "btc"
                        : collateralType.toLowerCase()
                    }
                    width={16}
                    height={16}
                  />
                )}
                {item.value}
                {item.isSuffixIcon && (
                  <TokenIcon
                    token={
                      collateralType === CollateralTypes.WBTC
                        ? "btc"
                        : collateralType.toLowerCase()
                    }
                    width={16}
                    height={16}
                  />
                )}
              </span>
            </div>
          ))}
        </div>
      </BaseCard>
    </Link>
  );
}
