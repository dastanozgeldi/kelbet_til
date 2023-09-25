import Link from "next/link";
import { Logo } from "./logo";

export const Nav = () => {
  const links = [
    {
      href: "/books",
      label: "кітаптар",
    },
    {
      href: "/about",
      label: "сайт туралы",
    },
  ];

  return (
    <nav className="w-full flex items-center justify-between">
      <Logo />

      <div className="text-lg flex items-center gap-6 uppercase focus:ring-0 focus:ring-offset-0">
        {links.map((link, i) => (
          <Link key={i} href={link.href}>
            {link.label}
          </Link>
        ))}
        <Link href="/support">
          <button className="px-4 py-2 bg-[#6C63FF] text-white">Қолдау</button>
        </Link>
      </div>
    </nav>
  );
};
