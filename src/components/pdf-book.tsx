import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";

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

  return (
    <div className="pdf-book">
      <p>
        {currentPage} of {numPages}
      </p>
      {numPages >= 3 && (
        <div className="flex items-center gap-6">
          <button onClick={prevPage}>
            <ChevronLeft />
          </button>
          <button onClick={nextPage}>
            <ChevronRight />
          </button>
        </div>
      )}
      <Document
        className="flex"
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page pageNumber={currentPage} />
        {currentPage + 1 <= numPages && <Page pageNumber={currentPage + 1} />}
      </Document>
    </div>
  );
};
