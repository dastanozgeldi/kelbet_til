import { useState } from "react";
import { Document, Page } from "react-pdf";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";

export const PDFBook = ({ file }: { file: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const nextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 2);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 2);
    }
  };

  const hasMultiplePages = numPages >= 3;

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <button disabled={!hasMultiplePages} onClick={prevPage}>
          <ChevronLeft className="w-8 h-8" />
        </button>
        <p>
          {currentPage} бет (жалпы {numPages})
        </p>
        <button disabled={!hasMultiplePages} onClick={nextPage}>
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
      <Document
        className="flex items-center flex-col xl:flex-row"
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page pageNumber={currentPage} renderTextLayer={false} />
        {currentPage + 1 <= numPages && (
          <Page pageNumber={currentPage + 1} renderTextLayer={false} />
        )}
      </Document>
    </>
  );
};
