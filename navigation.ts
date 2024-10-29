import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "es", "fr", "hi", "ja", "pt", "zh-CN"];
export const localePrefix = "always";
export const defaultLocale = "en";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ localePrefix, locales });
