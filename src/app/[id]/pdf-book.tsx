import "react-pdf/dist/Page/AnnotationLayer.css";
import Image from "next/image";
import { Document, Page } from "react-pdf";
import { usePDFBook } from "@/hooks/use-pdf-book";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  bookId: string;
  file: string;
}

export const PDFBook = ({ bookId, file }: Props) => {
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
  } = usePDFBook(bookId);

  return (
    <>
      <button
        className="fixed z-10 top-1/2 left-3 disabled:text-gray-400"
        disabled={noPrevPage}
        onClick={handlePrevPage}
      >
        <Icons.left className="w-8 h-8" />
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

        <Button className="flex items-center gap-3">
          <Icons.ai className="h-4 w-4" />
          AI
        </Button>
      </div>

      <button
        className="fixed z-10 top-1/2 right-3 disabled:text-gray-400"
        disabled={noNextPage}
        onClick={handleNextPage}
      >
        <Icons.right className="w-8 h-8" />
      </button>
      <Document
        className="mt-3 flex items-center justify-center flex-col xl:flex-row border-t"
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
        file={file}
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
        {currentPage + 1 <= numPages && (
          <Page
            noData={`Бұндай бет (${currentPage}-бет) жоқ`}
            error="Бетті жүктеуде қате туындады"
            loading="Бет жүктелуде..."
            renderTextLayer={false}
            pageNumber={currentPage + 1}
          />
        )}
      </Document>
    </>
  );
};
