"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import type { Book } from "@prisma/client";
import { Document, Page, pdfjs } from "react-pdf";
import { usePDFBook } from "../_hooks/use-pdf-book";
import PageControls from "./page-controls";
import { useContainerWidth } from "@/hooks/use-container-width";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PDFBook = ({ book }: { book: Book }) => {
  const width = useContainerWidth();
  const { numPages, currentPage, setCurrentPage, handleDocumentLoadSuccess } =
    usePDFBook(book.id);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        const response = await fetch("/api/files", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: book.fileUrl }),
        });

        if (!response.ok) {
          throw new Error("Failed to get file URL");
        }

        const { signedUrl } = await response.json();
        setFileUrl(signedUrl);
      } catch (err) {
        console.error("Error fetching signed URL:", err);
        setError("Файлды жүктеуде қате туындады");
      }
    };

    fetchSignedUrl();
  }, [book.fileUrl]);

  if (error) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!fileUrl) {
    return <Skeleton className="h-[600px] w-full" />;
  }

  return (
    <>
      <PageControls
        numPages={numPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Document
        className="mt-3"
        file={fileUrl}
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
