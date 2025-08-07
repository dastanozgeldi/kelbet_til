"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { type Session } from "next-auth";
import { links } from "@/data/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            {getPageTitle()}
          </h1>
          <hr className="bg-primary h-[3px] max-w-[36px] border-0 sm:h-[6px]" />
        </div>
        <div className="flex items-center space-x-2">
          <Avatar className="size-8">
            <AvatarImage src={image!} alt="админ" />
            <AvatarFallback>{name ? name[0] : "KT"}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-muted-foreground text-xs">Администратор</span>
            <h3 className="-mt-2 font-semibold">{user.name}</h3>
          </div>
        </div>
      </div>

      <div className="my-5 h-[1.5px] w-full bg-gray-100" />
    </>
  );
};
