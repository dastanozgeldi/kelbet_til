"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import type { Book } from "@prisma/client";
import { Document, Page, pdfjs } from "react-pdf";
import { usePDFBook } from "../_hooks/use-pdf-book";
import PageControls from "./page-controls";
import { useContainerWidth } from "@/hooks/use-container-width";
import { Skeleton } from "@/components/ui/skeleton";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PDFBook = ({ book }: { book: Book }) => {
  const width = useContainerWidth();
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
        className="mt-3"
        file={book.fileUrl}
        onLoadSuccess={handleDocumentLoadSuccess}
        onLoadError={console.error}
        loading={<Skeleton className="h-[600px] w-full" />}
      >
        <Page
          width={width}
          noData={`Бұндай бет (${currentPage}-бет) жоқ`}
          error="Бетті жүктеуде қате туындады"
          loading={<Skeleton className="h-[600px] w-full" />}
          renderTextLayer={false}
          pageNumber={currentPage}
        />
      </Document>
    </>
  );
};
