export default function PortfolioLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section className="flex w-full justify-center py-0 md:py-[50px]">
        {children}
      </section>
    );
  }
  