"use client";

import Image from "next/image";
import { Lato } from "next/font/google";
import { twMerge } from "tailwind-merge";

import forestBGSrc from "@/assets/images/forestbg.svg";
import groundBGSrc from "@/assets/images/groundbg.svg";
import zentoshiSrc from "@/assets/images/zentoshi/tizzMascot2.svg";

import "../styles/globals.css";
import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return (
    <html lang="en" className={twMerge("dark", lato.className)}>
      <body>
        <div className="relative h-screen w-screen overflow-hidden bg-tizz-background">
          <Image
            src={forestBGSrc}
            className="absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 2xl:h-full"
            alt="forest"
          />

          <Image
            src={groundBGSrc}
            className="absolute bottom-0 left-0 z-10 w-full "
            alt="ground"
          />
          <Image
            src={zentoshiSrc}
            className="absolute bottom-0 left-0 z-20 w-[50%] translate-y-[10%]"
            alt="ground"
          />

          <div className="absolute left-1/2 top-[20%] z-20 flex min-w-[664px] flex-col items-start gap-10 text-white">
            <div className="flex flex-col gap-6">
              <h1 className="text-[174px] leading-[218px]">404</h1>
              <p className="text-5xl font-black leading-[60px]">
                Oops! This Page Can&apos;t Be Found
              </p>
              <p className="text-[30px] font-bold leading-[38px]">
                It looks like the page you&apos;re looking for doesn&apos;t
                exist.
              </p>
            </div>
            <Link href="/" className="flex items-center gap-2">
              <ArrowIcon />
              Go To Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
