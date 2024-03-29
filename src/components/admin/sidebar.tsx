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
    <div className="fixed h-[90vh] w-64 py-8 pr-6 border-r">
      <h1 className="text-xl font-bold">Администратор</h1>

      <div className="my-5 w-full h-[1.5px] bg-gray-100" />

      {/* sidebar links */}
      <div className="pt-4">
        {links.map(({ href, label, icon }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              "flex items-center gap-3 mb-6 text-sm",
              href === pathname && "text-[#6C63FF]"
            )}
          >
            {icon} {label}
          </Link>
        ))}
      </div>

      {/* logout */}
      <button
        className="absolute bottom-0 text-red-500 flex items-center gap-3 text-sm my-6"
        onClick={() => signOut()}
      >
        <Icons.logout width={20} height={20} /> Шығу
      </button>
    </div>
  );
};
