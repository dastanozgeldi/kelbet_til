"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { links } from "@/config";

import { Icons } from "../icons";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed h-[87vh] w-12 border-r pt-6 md:w-64">
      {links.map(({ href, label, icon }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            "mb-6 flex items-center gap-3 text-sm",
            href === pathname && "text-[#6C63FF]",
          )}
        >
          {icon}
          <span className="hidden md:block">{label}</span>
        </Link>
      ))}

      <button
        className="absolute bottom-6 flex items-center gap-3 text-sm text-red-500"
        onClick={() => signOut()}
      >
        <Icons.logout width={20} height={20} />
        <span className="hidden md:block">Шығу</span>
      </button>
    </div>
  );
};
