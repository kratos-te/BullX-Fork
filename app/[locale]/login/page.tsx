"use client";

import { HeroContent } from "@/login-components/HeroContent/HeroContent";

export default function Page() {
  return (
    <div className="flex w-full flex-col px-[15px] py-6 2xl:mx-auto 2xl:max-w-[1400px] 2xl:items-center 2xl:gap-0 2xl:py-0">
      <HeroContent />
    </div>
  );
}
