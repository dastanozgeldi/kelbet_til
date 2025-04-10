import { useEffect, useState } from "react";

export const usePDFBook = (bookId: string, resetRectangle: () => void) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  const hasMultiplePages = numPages >= 2;

  const noPrevPage = !hasMultiplePages || currentPage === 1;
  const noNextPage = !hasMultiplePages || currentPage === numPages;

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      resetRectangle();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      resetRectangle();
    }
  };

  useEffect(() => {
    const getLastPage = () => {
      const id = localStorage.getItem("last-book-id");
      const page = Number(localStorage.getItem("last-book-page"));

      if (id && id === bookId && page) {
        setCurrentPage(page);
      }
    };

    getLastPage();
  }, [bookId]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      localStorage.setItem("last-book-page", currentPage.toString());
      localStorage.setItem("last-book-id", bookId);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [bookId, currentPage]);

  return {
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
  };
};
