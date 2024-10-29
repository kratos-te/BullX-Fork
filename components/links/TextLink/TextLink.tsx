import { Link } from "@/navigation";

export type TextLinkProps = {
  href: string;
  label: string;
};

export default function TextLink({ href, label }: TextLinkProps) {
  return (
    <Link
      href={href}
      className="border-b-2 border-b-white text-base font-semibold leading-normal"
    >
      {label}
    </Link>
  );
}
