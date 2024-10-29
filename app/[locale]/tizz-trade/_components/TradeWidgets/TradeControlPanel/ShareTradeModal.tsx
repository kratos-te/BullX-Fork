"use client";

import { useRef } from "react";
import NextImage from "next/image";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalFooter,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { toBlob } from "html-to-image";

import { useTranslations } from "next-intl";

import { getPriceStr } from "@/utils/price";

import tizzLogoSrc from "@/assets/icons/TizzLogo.svg";
import gallerySrc from "@/assets/icons/gallery-icon.svg";
import tizzMoonSrc from "@/assets/images/tizzMoon.svg";
import tizzRocketSrc from "@/assets/images/tizzRocket.svg";

import XIcon from "@/components/icons/social/XIcon";
import ImageIcon from "@/components/icons/ImageIcon";

export type ShareTradeModalProps = {
  tradeInfo: {
    pairName: string;
    buy: boolean;
    leverage: number;
    pnl: number;
    pnlPercentageStr: string;
    openPrice: number;
    lastPrice?: number;
  };
  isOpen: boolean;
  onOpenChange(): void;
};

export default function ShareTradeModal({
  tradeInfo,
  isOpen,
  onOpenChange,
}: ShareTradeModalProps) {
  const t = useTranslations("Trade-ShareTradeModal");
  const ref = useRef<HTMLDivElement>(null);

  const handleCopyToClipboard = () => {
    if (!ref.current) {
      return;
    }

    toBlob(ref.current).then((blob) => {
      if (!blob) {
        return;
      }

      navigator.clipboard
        .write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ])
        .then(() => {
          console.log("Image copied to clipboard");
        })
        .catch((err) => {
          console.error("Could not copy image to clipboard: ", err);
        });
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        base: "bg-neutral-950 border border-stroke w-[100vw] md:w-[446px]",
        closeButton: "z-10 !bg-white text-black hover:scale-105 p-1",
      }}
    >
      <ModalContent>
        <ModalBody className="p-0">
          <div
            ref={ref}
            className="relative flex h-[482px] flex-none flex-col gap-10 bg-[#021506] p-8"
          >
            <NextImage src={tizzLogoSrc} width={86} alt="tizz logo" />
            <NextImage
              src={tradeInfo.pnl >= 0 ? tizzRocketSrc : tizzMoonSrc}
              width={282}
              className="absolute bottom-0 right-0"
              alt="tizz picture"
            />

            <div className="flex items-center gap-2">
              <span className="text-[24px] font-black leading-[28px] text-white">
                {tradeInfo.pairName}
              </span>
              <span
                className={twMerge(
                  "rounded-[3px] px-3 py-1 text-[9px] font-semibold leading-[13px]",
                  tradeInfo.buy
                    ? "bg-emerald-400/20 text-emerald-400"
                    : "bg-red-500/20 text-red-500",
                )}
              >
                {`${tradeInfo.buy ? "Long" : "Short"} ${tradeInfo.leverage}x`}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm leading-[18px] text-white">ROI</span>
              <span
                className={twMerge(
                  "text-[46px] font-black leading-[43px]",
                  tradeInfo.pnl >= 0 ? "text-emerald-400" : "text-red-500",
                )}
              >
                {tradeInfo.pnlPercentageStr}%
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-lg text-neutral-400">
                  {t("entry-price")}
                </span>
                <span className="text-[24px] font-bold leading-[28px] text-white">
                  {getPriceStr(tradeInfo.openPrice)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg text-neutral-400">
                  {t("last-price")}
                </span>
                <span className="text-[24px] font-bold leading-[28px] text-white">
                  {tradeInfo.lastPrice ? getPriceStr(tradeInfo.lastPrice) : "-"}
                </span>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col gap-6 bg-neutral-800 p-6">
          <span className="text-base font-semibold text-zinc-300">
            {t("share-your-result")}
          </span>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Button isIconOnly>
                <XIcon size={24} className="scale-75 2xl:scale-100" />
              </Button>
              <span className="text-sm text-white">Twitter</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button isIconOnly onClick={handleCopyToClipboard}>
                <ImageIcon src={gallerySrc} width={24} height={24} />
              </Button>
              <span className="text-sm text-white">{t("copy-image")}</span>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
