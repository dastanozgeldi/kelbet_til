"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import type { Book } from "@prisma/client";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePDFBook } from "../_hooks/use-pdf-book";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  XIcon,
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PDFBook = ({ book }: { book: Book }) => {
  const {
    numPages,
    currentPage,
    noPrevPage,
    noNextPage,
    isEditing,
    setCurrentPage,
    setIsEditing,
    handlePrevPage,
    handleNextPage,
    handleDocumentLoadSuccess,
  } = usePDFBook(book.id);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="fixed top-1/2 left-3 z-10"
        disabled={noPrevPage}
        onClick={handlePrevPage}
      >
        <ChevronLeftIcon className="size-8" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="fixed top-1/2 right-3 z-10"
        disabled={noNextPage}
        onClick={handleNextPage}
      >
        <ChevronRightIcon className="size-8" />
      </Button>

      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex items-center justify-center gap-3">
            <Input
              className="ml-2 w-16"
              onChange={(event) =>
                setCurrentPage(Number(event.currentTarget.value))
              }
            />
            <Button onClick={() => setIsEditing(false)}>OK</Button>
          </div>
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center font-bold"
          >
            {currentPage}-бет (жалпы {numPages})
          </span>
        )}
      </div>

      <Document
        className="mt-3 flex flex-col items-center justify-center border-t xl:flex-row"
        loading={
          <div className="mt-3 flex items-center justify-center gap-2">
            <Loader2Icon className="animate-spin" />
            Кітап ашылуда...
          </div>
        }
        error={
          <div className="mt-3 flex flex-col items-center">
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
        <div className="relative flex flex-col items-center justify-center xl:flex-row">
          <Page
            noData={`Бұндай бет (${currentPage}-бет) жоқ`}
            error="Бетті жүктеуде қате туындады"
            loading="Бет жүктелуде..."
            renderTextLayer={false}
            pageNumber={currentPage}
          />
        </div>
      </Document>
    </>
  );
};
