import "react-pdf/dist/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf";
import { usePDFBook } from "@/hooks/use-pdf-book";
import { Icons } from "./icons";
import { PDFBookLoading } from "./pdf-book-loading";
import { PDFBookError } from "./errors";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
      {isEditing ? (
        <div className="flex items-center justify-center gap-3 m-3">
          <Input
            className="w-16"
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
      <button
        className="fixed z-10 top-1/2 right-3 disabled:text-gray-400"
        disabled={noNextPage}
        onClick={handleNextPage}
      >
        <Icons.right className="w-8 h-8" />
      </button>
      <Document
        loading={<PDFBookLoading />}
        error={<PDFBookError />}
        className="flex items-center justify-center flex-col xl:flex-row"
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
