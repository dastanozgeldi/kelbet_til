import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./logo";
import { Icons } from "./icons";
import Link from "next/link";

export const Nav = () => {
  const links = [
    {
      href: "/#works",
      label: "Шығармалар",
    },
  ];

  return (
    <nav className="w-full flex items-center justify-between">
      <Logo />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icons.menu />
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
