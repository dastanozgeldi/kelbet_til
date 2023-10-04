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
              <a href={link.href}>{link.label}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
