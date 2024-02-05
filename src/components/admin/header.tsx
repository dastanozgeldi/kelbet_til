"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { type Session } from "next-auth";

import { links } from "@/config/links";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Header = ({ user }: { user: Session["user"] }) => {
  const { image, name } = user;
  const pathname = usePathname();

  const getPageTitle = useCallback(() => {
    const link = links.find((link) => link.href === pathname);
    const title = link ? link.label : "Страница";

    return title;
  }, [pathname]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={image!} alt="админ" />
            <AvatarFallback>{name ? name[0] : "KT"}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-[#7d8385] text-[11px]">Администратор</span>
            <h3 className="-mt-1 text-[15px] font-semibold">{user.name}</h3>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="my-5 w-full h-[1.5px] bg-gray-100" />
    </>
  );
};
