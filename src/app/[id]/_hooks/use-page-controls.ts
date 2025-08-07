import { useState } from "react";

export const usePageControls = (
  numPages: number,
  currentPage: number,
  setCurrentPage: (page: number) => void,
) => {
  const [isEditing, setIsEditing] = useState(false);

  const hasMultiplePages = numPages >= 2;

  const noPrevPage = !hasMultiplePages || currentPage === 1;
  const noNextPage = !hasMultiplePages || currentPage === numPages;

  const handleNextPage = () => {
    if (currentPage < numPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  return {
    noPrevPage,
    noNextPage,
    handlePrevPage,
    handleNextPage,
    isEditing,
    setIsEditing,
  };
};
