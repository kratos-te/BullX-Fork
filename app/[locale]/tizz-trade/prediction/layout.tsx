import Image from "next/image";

import predictionBGSrc from "@/assets/images/predictionbg.svg";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="relative flex w-full justify-center p-3 md:py-[47px]">
      <Image
        src={predictionBGSrc}
        className="absolute left-0 top-0 w-full"
        alt="bg"
      />
      <div className="w-full md:max-w-[1638px]">{children}</div>
    </section>
  );
}
