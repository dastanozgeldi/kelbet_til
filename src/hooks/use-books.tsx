import { Book } from "@prisma/client";
import { useEffect, useState } from "react";
import { grades, languages, terms } from "@/config";

export const useBooks = (data: Book[]) => {
  const [grade, setGrade] = useState(grades[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [term, setTerm] = useState(terms[0]);

  const [searchValue, setSearchValue] = useState("");

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
