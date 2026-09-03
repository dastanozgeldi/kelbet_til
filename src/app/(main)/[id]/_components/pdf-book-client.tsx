"use client";

import type { Book } from "@prisma/client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const PDFBook = dynamic(
  () => import("./pdf-book").then((module) => module.PDFBook),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[600px] w-full" />,
  },
);

export function PDFBookClient({ book }: { book: Book }) {
  return <PDFBook book={book} />;
}
