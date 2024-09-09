"use client";
import { pdfjs } from "react-pdf";

import { PDFBook } from "./pdf-book";
import { useBook } from "./use-book";
import { Skeleton } from "@/components/ui/skeleton";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Page({ params }: { params: { id: string } }) {
  const { loading, book } = useBook(params.id);

  if (loading) {
    return (
      <div className="my-6 overflow-hidden">
        <div className="mb-6">
          <Skeleton className="w-full h-10 my-2" />
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <Skeleton className="h-[600px]" />
      </div>
    );
  }
  return (
    book && (
      <div className="my-6 overflow-hidden">
        <div className="mb-6">
          <h1 className="text-3xl my-2 md:text-4xl font-bold">{book.title}</h1>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <PDFBook bookId={params.id} title={book.title} file={book.fileUrl} />
      </div>
    )
  );
}
