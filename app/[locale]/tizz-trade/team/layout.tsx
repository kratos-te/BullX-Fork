export default function TeamLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <section className="flex w-full justify-center pt-0 md:py-[50px]">
      <div className="flex w-full gap-[39px] p-3 md:w-fit">
        <div className="w-full md:max-w-[936px] xl:w-[810px]">{children}</div>
        <div className="hidden w-[400px] flex-none flex-col gap-6 xl:flex">
          {sidebar}
        </div>
      </div>
    </section>
  );
}
