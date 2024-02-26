import { useEffect, useState } from "react";

export const usePDFBook = (bookId: string) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  const hasMultiplePages = numPages >= 3;

  const noPrevPage = !hasMultiplePages || currentPage === 1;
  const noNextPage =
    !hasMultiplePages ||
    currentPage === numPages ||
    currentPage + 1 === numPages;

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      const newPage = currentPage + 2;
      setCurrentPage(newPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 2;
      setCurrentPage(newPage);
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
