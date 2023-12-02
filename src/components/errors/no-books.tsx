import Image from "next/image";
import React from "react";
import { Icons } from "../icons";

export const NoBooks = () => {
  return (
    <div className="my-6 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <Icons.x />
        <span>Шығармалар әлі жүктелмеген.</span>
      </div>
      <Image alt="Шығарма жоқ" src="/failed.svg" width={500} height={350} />
    </div>
  );
};
