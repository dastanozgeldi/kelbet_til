import Image from "next/image";
import React from "react";
import { Icons } from "../icons";

export const PDFBookError = () => {
  return (
    <div className="my-6 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <Icons.x />
        <span>Шығарма жүктелмеген.</span>
      </div>
      <Image alt="Failed to load." src="/failed.svg" width={599} height={417} />
    </div>
  );
};
