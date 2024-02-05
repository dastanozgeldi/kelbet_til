import { type Book } from "@prisma/client";
import { useEffect, useState } from "react";

export const useAdminBooks = (data: Book[]) => {
  const grades = ["7", "8", "9", "10", "11", "12"];
  const languages = ["T1", "T2"];
  const terms = ["1", "2", "3", "4"];

  const [grade, setGrade] = useState(grades[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [term, setTerm] = useState(terms[0]);

  const [searchValue, setSearchValue] = useState("");

  // explanation: russian-speaking 12th graders don't have a T2.
  let books = null;
  if (grade === "12" && language === "T2") {
    books = data.filter(
      (book) => book.grade === "12" && book.language === "T1"
    );
  } else {
    books = data.filter(
      (book) => book.grade === grade && book.language === language
    );
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const getStorageItems = () => {
      const grade = localStorage.getItem("admin-grade");
      if (grade) setGrade(grade);

      const language = localStorage.getItem("admin-language");
      if (language) setLanguage(language);

      const term = localStorage.getItem("admin-term");
      if (term) setTerm(term);
    };

    getStorageItems();
  }, []);

  return {
    grade,
    language,
    term,
    searchValue,
    grades,
    filteredBooks,
    setGrade,
    setLanguage,
    setTerm,
    setSearchValue,
  };
};
