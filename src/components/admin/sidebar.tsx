"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin",
      label: "Шығармалар",
      icon: <Book width={20} height={20} />,
    },
    {
      href: "/admin/new",
      label: "Жаңа шығарма",
      icon: <Plus width={20} height={20} />,
    },
    {
      href: "/admin/users",
      label: "Қолданушылар",
      icon: <Users width={20} height={20} />,
    },
  ];

  return (
    <div className="fixed h-screen w-64 p-6 border-r">
      {/* sidebar header */}
      <div>
        <h1 className="text-2xl font-bold">Администратор</h1>
      </div>

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
    </div>
  );
};
