"use client";
import { pdfjs } from "react-pdf";

import { Skeleton } from "@/components/ui/skeleton";
import { PDFBook } from "./pdf-book";
import { useBook } from "./use-book";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

export default function Page({ params }: { params: { id: string } }) {
  const { loading, book, user, history, loadHistory } = useBook(params.id);

  if (loading) {
    return (
      <div className="my-6 overflow-hidden">
        <div className="mb-6">
          <Skeleton className="my-2 h-10 w-full" />
          <hr className="h-[6px] max-w-[36px] border-0 bg-[#6C63FF]" />
        </div>
        <Skeleton className="h-[600px]" />
      </div>
    );
  }
  return (
    book && (
      <div className="my-6 overflow-hidden">
        <div className="mb-6">
          <h1 className="my-2 text-3xl font-bold md:text-4xl">{book.title}</h1>
          <hr className="h-[6px] max-w-[36px] border-0 bg-[#6C63FF]" />
        </div>
        <PDFBook
          book={book}
          user={user}
          history={history}
          loadHistory={loadHistory}
        />
      </div>
    )
  );
}
