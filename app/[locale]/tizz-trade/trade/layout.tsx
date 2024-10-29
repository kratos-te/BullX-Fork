export default function TradeLayout({
  children,
  sidebar,
  rightbar,
  panel,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  rightbar: React.ReactNode;
  panel: React.ReactNode;
}>) {
  return (
    <section className="flex w-full flex-col-reverse md:h-full md:flex-row">
      <div className="flex w-full flex-1 flex-col border-t border-t-stroke md:hidden">
        {panel}
      </div>

      <div className="min-w-[300px] overflow-auto border-r border-r-stroke">
        {sidebar}
      </div>

      <main className="flex w-full flex-col md:h-full md:w-[calc(100%-400px)]">
        <div className="flex w-full flex-col md:flex-row">
          <div className="m-0 flex h-[480px] w-full flex-col border-b-1 border-stroke md:w-[calc(100%-300px)] md:border-b-0">
            {children}
          </div>
          <div className="hidden h-[300px] w-full border-l border-l-stroke md:block md:h-full md:w-[300px]">
            {rightbar}
          </div>
        </div>

        <div className="hidden h-[calc(100%-480px)] w-full flex-col border-t border-t-stroke md:flex">
          {panel}
        </div>
      </main>
    </section>
  );
}
