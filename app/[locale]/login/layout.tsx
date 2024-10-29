"use client";

import { useEffect, useRef, useState } from "react";

import { TopNavbar } from "@/login-components/Navbar/TopNavbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen w-screen overflow-x-hidden overflow-y-hidden bg-[#080808] pb-[60px] pt-[6px] 2xl:p-0">
      <TopNavbar mode={"sticky"} />

      {children}
    </section>
  );
}
