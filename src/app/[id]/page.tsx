"use client";
import { PDFBook } from "@/components/pdf-book";
import { type Book } from "@prisma/client";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const getBook = async () => {
      const res = await fetch(`/api/get-book`, {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      const { book } = await res.json();

      setBook(book);
    };

    getBook();
  }, [id]);

  return (
    book && (
      <div className="my-6 overflow-hidden">
        <div className="mb-6">
          <h1 className="text-3xl my-2 md:text-4xl font-bold">{book.title}</h1>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <PDFBook file={book.fileUrl} />
      </div>
    )
  );
}
