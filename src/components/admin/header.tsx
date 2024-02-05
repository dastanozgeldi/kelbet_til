"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";

import { links } from "@/config/links";

export const Header = () => {
  const pathname = usePathname();

  const getPageTitle = useCallback(() => {
    const link = links.find((link) => link.href === pathname);
    const title = link ? link.label : "Страница";

    return title;
  }, [pathname]);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
        <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
      </div>

      {/* divider */}
      <div className="my-5 w-full h-[1.5px] bg-gray-100" />
    </>
  );
};
