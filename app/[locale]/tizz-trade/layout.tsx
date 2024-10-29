import LogoLink from "@/components/links/LogoLink/LogoLink";

import TopNavbar from "@/tizz-trade-components/Navbar/TopNavbar";
import RightNavbar from "@/tizz-trade-components/Navbar/RightNavbar";
import Sidebar from "./_components/Navbar/Sidebar";
import Footer from "@/tizz-trade-components/Footer/Footer";

import Menu from "@/tizz-trade-components/Navbar/Menu";

export default function TizzTradeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen w-screen overflow-hidden bg-tizz-background flex">
      <Sidebar pathPrefix="/tizz-trade" />
      <main className="mb-[30px] overflow-auto">
        {children}
      </main>
      <Footer />
    </section>
  );
}
