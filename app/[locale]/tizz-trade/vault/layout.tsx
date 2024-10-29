export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex w-full justify-center pt-0 md:pt-[50px]">
      <div className="flex w-full max-w-[1391px] flex-col gap-8 p-[10px] md:w-full md:p-0">
        {children}
      </div>
    </section>
  );
}
