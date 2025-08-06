"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import type { Book, Message } from "@prisma/client";
import type { User } from "next-auth";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidRectangle } from "@/lib/utils";
import { usePDFBook } from "../_hooks/use-pdf-book";
import { useExplanation } from "../_hooks/use-explanation";
import { useRectangle } from "../_hooks/use-rectangle";
import { ExplanationDialog } from "./explanation-dialog";
import { ChatDialog } from "./chat-dialog";
import {
  BookOpenCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  XIcon,
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  book: Book;
  user: User | null;
  history: Message[];
  loadHistory: () => void;
}

export const PDFBook = ({ book, user, history, loadHistory }: Props) => {
  const {
    croppedImage,
    rectangle,
    pdfDocumentRef,
    canvasRef,
    handlePageRender,
    handleStart,
    handleMove,
    handleEnd,
    resetRectangle,
  } = useRectangle();

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
  } = usePDFBook(book.id, resetRectangle);

  const { isExplanationLoading, explanation, handleExplanation } =
    useExplanation();

  return (
    <>
      <button
        className="fixed top-1/2 left-3 z-10 disabled:text-gray-400"
        disabled={noPrevPage}
        onClick={handlePrevPage}
      >
        <ChevronLeftIcon className="size-8" />
      </button>

      <button
        className="fixed top-1/2 right-3 z-10 disabled:text-gray-400"
        disabled={noNextPage}
        onClick={handleNextPage}
      >
        <ChevronRightIcon className="size-8" />
      </button>

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

        {/* {user && ( */}
        <ChatDialog
          book={book}
          // user={user}
          history={history}
          loadHistory={loadHistory}
        />
        {/* )} */}
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
        onLoadSuccess={(pdf) => {
          pdfDocumentRef.current = pdf;
          handleDocumentLoadSuccess(pdf);
        }}
        onLoadError={console.error}
      >
        <div className="relative mt-3 flex flex-col items-center justify-center border-t xl:flex-row">
          <Page
            noData={`Бұндай бет (${currentPage}-бет) жоқ`}
            error="Бетті жүктеуде қате туындады"
            loading="Бет жүктелуде..."
            renderTextLayer={false}
            pageNumber={currentPage}
            onRenderSuccess={handlePageRender}
          />
          {/* {user?.canUseAI && ( */}
          <>
            <canvas
              ref={canvasRef}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "all",
              }}
            />
            {rectangle && isValidRectangle(rectangle) && croppedImage && (
              <Button
                className="flex items-center gap-2"
                disabled={isExplanationLoading}
                size="sm"
                style={{
                  position: "absolute",
                  top: `${rectangle.y + rectangle.height}px`,
                  left: `${rectangle.x}px`,
                  zIndex: 10,
                }}
                onClick={() => handleExplanation(book.title, croppedImage)}
              >
                {isExplanationLoading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <BookOpenCheckIcon className="size-4" />
                )}
                Мағынасы
              </Button>
            )}
          </>
          {/* )} */}
        </div>
      </Document>

      {explanation && <ExplanationDialog content={explanation} />}
    </>
  );
};
