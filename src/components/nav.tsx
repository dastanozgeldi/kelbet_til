import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./logo";
import { Menu } from "lucide-react";

export const Nav = () => {
  const links = [
    {
      href: "/#works",
      label: "Шығармалар",
    },
    {
      href: "/#about",
      label: "Сайт туралы",
    },
  ];

  return (
    <nav className="w-full flex items-center justify-between">
      <Logo />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Сілтемелер</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {links.map((link, i) => (
            <DropdownMenuItem key={i}>
              <Link href={link.href}>{link.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
