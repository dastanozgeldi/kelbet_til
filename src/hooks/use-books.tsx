import { filters } from "@/config";
import { type Book } from "@prisma/client";
import { useEffect, useState } from "react";

export const useBooks = (data: Book[]) => {
  const [program, setProgram] = useState(filters.programs[0]);
  const [grade, setGrade] = useState(filters.grades[0]);
  const [language, setLanguage] = useState(filters.languages[0]);
  const [term, setTerm] = useState(filters.terms[0]);

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

  useEffect(() => {
    const getStorageItems = () => {
      const program = localStorage.getItem("program");
      if (program) setProgram(program);

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
    books,
    program,
    grade,
    language,
    term,
    setProgram,
    setGrade,
    setLanguage,
    setTerm,
  };
};
