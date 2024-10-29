import Image from "next/image";
import { Link } from "@/navigation";

import logo from "@/assets/icons/Tizz.svg";

type LogoLinkProps = {
  label: string;
  href: string;
};

export default function LogoLink({ href }: LogoLinkProps) {
  return (
    <Link href={href}>
      <Image
        src={logo}
        alt="Logo"
        className="h-[28px] max-w-[70px] md:h-[40px] md:max-w-[100px]"
      />
    </Link>
  );
}
