"use client";
import { type Book } from "@prisma/client";
import Link from "next/link";
import { useBooks } from "@/hooks/use-books";
import { SearchBooks } from "./search-books";
import { GradeFilter, LanguageFilter, TermFilter } from "./filters";

export const Books = ({ data }: { data: Book[] }) => {
  const {
    grade,
    language,
    term,
    searchValue,
    filteredBooks,
    setGrade,
    setLanguage,
    setTerm,
    setSearchValue,
  } = useBooks(data);

  return (
    <div id="books" className="py-6">
      <div className="min-h-screen">
        <div className="mb-6">
          <h1 className="my-2 text-3xl font-bold md:text-4xl">Шығармалар</h1>
          <hr className="h-[6px] max-w-[36px] border-0 bg-[#6C63FF]" />
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <GradeFilter
            grade={grade}
            localStorageKey="grade"
            setGrade={setGrade}
          />
          <LanguageFilter
            language={language}
            localStorageKey="language"
            setLanguage={setLanguage}
          />
          <TermFilter term={term} localStorageKey="term" setTerm={setTerm} />
        </div>

        <SearchBooks
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <div className="pb-3">
          <h2 className="my-2 text-2xl font-bold">{term}-тоқсан</h2>
          <hr className="h-[6px] max-w-[36px] border-0 bg-[#6C63FF]" />
        </div>
        <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredBooks.map(
            (book) =>
              book.term === term && (
                <Link
                  key={book.id}
                  href={`/${book.id}`}
                  className="min-w-[300px] rounded bg-[#F8F8F8] p-8"
                >
                  <h2 className="text-2xl font-bold">{book.title}</h2>
                </Link>
              ),
          )}
        </div>
      </div>
    </div>
  );
};
