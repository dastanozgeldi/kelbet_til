"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import type { Book } from "@prisma/client";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import { usePDFBook } from "../_hooks/use-pdf-book";
import { Loader2Icon, XIcon } from "lucide-react";
import PageControls from "./page-controls";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PDFBook = ({ book }: { book: Book }) => {
  const { numPages, currentPage, setCurrentPage, handleDocumentLoadSuccess } =
    usePDFBook(book.id);

  return (
    <>
      <PageControls
        numPages={numPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Document
        loading={
          <div className="flex items-center justify-center gap-2">
            <Loader2Icon className="animate-spin" />
            Кітап ашылуда...
          </div>
        }
        error={
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <XIcon />
              <span>Шығарма жүктелмеген.</span>
            </div>
            <Image
              className="mt-6"
              alt="Failed to load."
              src="/failed.svg"
              width={599}
              height={417}
            />
          </div>
        }
        file={book.fileUrl}
        onLoadSuccess={handleDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page
          noData={`Бұндай бет (${currentPage}-бет) жоқ`}
          error="Бетті жүктеуде қате туындады"
          loading="Бет жүктелуде..."
          renderTextLayer={false}
          pageNumber={currentPage}
        />
      </Document>
    </>
  );
};
