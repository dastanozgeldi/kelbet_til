import Image from "next/image";

import { Icons } from "../icons";

interface Props {
  messageType: "book-is-null" | "not-uploaded-yet";
}

export const NoBook = ({ messageType }: Props) => {
  return (
    <div className="mt-6 flex flex-col items-center justify-center h-[80vh]">
      <div className="flex items-center space-x-2 text-lg font-semibold">
        <Icons.x />
        {messageType === "book-is-null" && (
          <span>Жүктеуде ақаулықтар туындады.</span>
        )}
        {messageType === "not-uploaded-yet" && (
          <span>Шығарма әлі жүктелмеген.</span>
        )}
      </div>
      <Image
        width={400}
        height={280}
        className="mt-6"
        alt="Шығарма жоқ"
        src="/failed.svg"
      />
    </div>
  );
};
