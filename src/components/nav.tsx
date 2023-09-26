import Link from "next/link";
import { Logo } from "./logo";

export const Nav = () => {
  const links = [
    {
      href: "/books",
      label: "Кітаптар",
    },
    {
      href: "/about",
      label: "Сайт туралы",
    },
  ];

  return (
    <nav className="w-full flex items-center justify-between">
      <Logo />

      <div className="text-lg flex items-center gap-6 focus:ring-0 focus:ring-offset-0">
        {links.map((link, i) => (
          <Link key={i} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
