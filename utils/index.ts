import { LimitOrder, Pair } from "@gainsnetwork/sdk";
import { Address } from "viem";
import { GuildApiError, TradingEvent } from "../types";
import { TradeContainer } from "@/types/index";
import { CollateralTypes } from "./tizz";
import crypto from "crypto";

export function isTradeContainer(
  trade: TradeContainer | LimitOrder,
): trade is TradeContainer {
  if ((trade as TradeContainer).trade === undefined) {
    return false;
  }

  return true;
}

export function isLimitOrder(
  trade: TradeContainer | LimitOrder,
): trade is LimitOrder {
  if ((trade as LimitOrder).trader === undefined) {
    return false;
  }

  return true;
}

export function shrinkAddress(address: Address, onlyFirst?: boolean) {
  if (onlyFirst) {
    return address.slice(0, 7);
  }
  return `${address.slice(0, 7)}...${address.slice(address.length - 5)}`;
}

export function isTizzEvent(data: any): data is TradingEvent {
  if (data && data.event !== undefined && data.event.trim() !== "") {
    return true;
  }

  return false;
}

export function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      var base64String = reader?.result as string;
      resolve(base64String);
    };

    reader.readAsDataURL(file);
  });
}

export function isGuildApiError(res: any): res is GuildApiError {
  if ((res.statusCode && res.statusCode !== 200) || res.error || res.message) {
    return true;
  }

  return false;
}

export function convertResToGuildError(res: any): GuildApiError {
  if (res.message && typeof res.message === "string") {
    return {
      error: res.error,
      message: [res.message],
      statusCode: res.statusCode,
    };
  }

  if (
    res.message &&
    typeof res.message === "object" &&
    Array.isArray(res.message)
  ) {
    return {
      error: res.error,
      message: res.message,
      statusCode: res.statusCode,
    };
  }

  return {
    error: res.error,
    statusCode: res.statusCode,
  };
}

export function calcGainedBaseAssetPercentage(
  trade: TradeContainer & {
    collateralType: CollateralTypes;
    collateralPriceUsd: number;
    pair: Pair;
  },
  currentPrice: number,
): number {
  const { openPrice, buy: long, leverage } = trade.trade;

  const p =
    openPrice > 0
      ? ((long ? currentPrice - openPrice : openPrice - currentPrice) *
          100 *
          leverage) /
        openPrice
      : 0;

  return p > 900 ? 900 : p;
}

export function calcGainedBaseAsset(
  trade: TradeContainer & {
    collateralType: CollateralTypes;
    collateralPriceUsd: number;
    pair: Pair;
  },
  currentPrice: number,
): number {
  const percentage = calcGainedBaseAssetPercentage(trade, currentPrice);
  const positionSizeBaseAsset =
    trade.tradeInfo.openInterestBaseAsset / trade.trade.leverage;

  return (positionSizeBaseAsset * percentage) / 100;
}

export const sleep = (delay: number /* miliseconds */) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export function encodeIp(ipAddress: string) {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector
  const keyBuffer = Buffer.from(process.env.NEXT_PUBLIC_SECRET || "", "hex");

  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);
  let encrypted = cipher.update(ipAddress);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decodeIp(encrypted: string) {
  const textParts = encrypted.split(":");
  const iv = textParts.shift();
  const encryptedText = textParts.join(":");
  const keyBuffer = Buffer.from(process.env.NEXT_PUBLIC_SECRET || "", "hex");

  if (iv && encryptedText) {
    const ivBuffer = Buffer.from(iv, "hex");
    const encryptedTextBuffer = Buffer.from(encryptedText, "hex");

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      keyBuffer,
      ivBuffer,
    );
    let decrypted = decipher.update(encryptedTextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  return "";
}

export const formatWalletAddress = (address: string) => {
  if (address.length < 10) {
    return address;
  }

  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4, address.length);
  return `${start}.....${end}`;
};

export const getMedal = (rank: number): string => {
  switch (rank) {
    case 1: {
      return "🥇";
    }
    case 2: {
      return "🥈";
    }
    case 3: {
      return "🥉";
    }
    default: {
      return `${rank}`;
    }
  }
};