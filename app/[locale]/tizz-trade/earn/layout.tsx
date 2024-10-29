export default function EarnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-full w-full">
      <main className="flex h-full flex-1 flex-col">{children}</main>
    </section>
  );
}
