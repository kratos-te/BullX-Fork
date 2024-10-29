import { Link } from "@/navigation";

type NavLinkProps = {
  label: string;
  href: string;
};

export default function NavLink({ label, href }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-center text-lg font-light leading-[27px] text-white"
    >
      {label}
    </Link>
  );
}
