export default function LeaderboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex w-full justify-center pt-0 md:py-[50px]">
      <div className="w-full md:max-w-[1248px]">{children}</div>
    </section>
  );
}
