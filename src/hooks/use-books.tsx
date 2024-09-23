import { filters } from "@/config";
import { type Book } from "@prisma/client";
import { useEffect, useState } from "react";

export const useBooks = (data: Book[]) => {
  const [grade, setGrade] = useState(filters.grades[0]);
  const [language, setLanguage] = useState(filters.languages[0]);
  const [term, setTerm] = useState(filters.terms[0]);

  const [searchValue, setSearchValue] = useState("");

  // explanation: russian-speaking 12th graders don't have a T2.
  let books = null;
  if (grade === "12" && language === "T2") {
    books = data.filter(
      (book) => book.grade === "12" && book.language === "T1",
    );
  } else {
    books = data.filter(
      (book) => book.grade === grade && book.language === language,
    );
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    const getStorageItems = () => {
      const grade = localStorage.getItem("grade");
      if (grade) setGrade(grade);

      const language = localStorage.getItem("language");
      if (language) setLanguage(language);

      const term = localStorage.getItem("term");
      if (term) setTerm(term);
    };

    getStorageItems();
  }, []);

  return {
    grade,
    language,
    term,
    searchValue,
    filteredBooks,
    setGrade,
    setLanguage,
    setTerm,
    setSearchValue,
  };
};
