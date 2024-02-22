import "react-pdf/dist/Page/AnnotationLayer.css";
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";

import { Icons } from "./icons";
import { PDFBookLoading } from "./pdf-book-loading";
import { PDFBookError } from "./errors";

interface Props {
  bookId: string;
  file: string;
}

export const PDFBook = ({ bookId, file }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number>(1);

  const hasMultiplePages = numPages >= 3;

  const noPrevPage = !hasMultiplePages || currentPage === 1;
  const noNextPage =
    !hasMultiplePages ||
    currentPage === numPages ||
    currentPage + 1 === numPages;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const nextPage = () => {
    if (currentPage < numPages) {
      const newPage = currentPage + 2;
      setCurrentPage(newPage);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 2;
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const getStorageItems = () => {
      const id = localStorage.getItem("last-book-id");
      if (id && id === bookId) {
        const page = localStorage.getItem("last-book-page");
        if (page) setCurrentPage(Number(page));
      }
    };

    getStorageItems();

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      localStorage.setItem("last-book-page", currentPage.toString());
      localStorage.setItem("last-book-id", bookId);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [bookId, currentPage]);

  return (
    <>
      <button
        className="fixed z-10 top-1/2 left-3 disabled:text-gray-400"
        disabled={noPrevPage}
        onClick={prevPage}
      >
        <Icons.left className="w-8 h-8" />
      </button>
      <span className="flex items-center justify-center font-bold">
        {currentPage}-бет (жалпы {numPages})
      </span>
      <button
        className="fixed z-10 top-1/2 right-3 disabled:text-gray-400"
        disabled={noNextPage}
        onClick={nextPage}
      >
        <Icons.right className="w-8 h-8" />
      </button>
      <Document
        loading={<PDFBookLoading />}
        error={<PDFBookError />}
        className="flex items-center justify-center flex-col xl:flex-row"
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
