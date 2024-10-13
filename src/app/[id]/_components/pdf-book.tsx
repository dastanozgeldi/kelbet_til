import "react-pdf/dist/Page/AnnotationLayer.css";
import type { Book, Message } from "@prisma/client";
import type { User } from "next-auth";
import Image from "next/image";
import { Document, Page } from "react-pdf";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidRectangle } from "@/lib/utils";
import { usePDFBook } from "../_hooks/use-pdf-book";
import { useExplanation } from "../_hooks/use-explanation";
import { useRectangle } from "../_hooks/use-rectangle";
import { ExplanationDialog } from "./explanation-dialog";
import { ChatDialog } from "./chat-dialog";

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
        className="fixed left-3 top-1/2 z-10 disabled:text-gray-400"
        disabled={noPrevPage}
        onClick={handlePrevPage}
      >
        <Icons.left className="h-8 w-8" />
      </button>

      <button
        className="fixed right-3 top-1/2 z-10 disabled:text-gray-400"
        disabled={noNextPage}
        onClick={handleNextPage}
      >
        <Icons.right className="h-8 w-8" />
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

        {user && (
          <ChatDialog
            book={book}
            user={user}
            history={history}
            loadHistory={loadHistory}
          />
        )}
      </div>

      <Document
        className="mt-3 flex flex-col items-center justify-center border-t xl:flex-row"
        loading={
          <div className="mt-3 flex items-center justify-center gap-2">
            <Icons.spinner className="animate-spin" />
            Кітап ашылуда...
          </div>
        }
        error={
          <div className="mt-3 flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Icons.x />
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
          {user?.canUseAI && (
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
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.explain className="h-4 w-4" />
                  )}
                  Мағынасы
                </Button>
              )}
            </>
          )}
        </div>
      </Document>

      {explanation && <ExplanationDialog content={explanation} />}
    </>
  );
};
