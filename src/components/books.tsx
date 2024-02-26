"use client";
import { type Book } from "@prisma/client";
import Link from "next/link";
import { grades } from "@/config";
import { useBooks } from "@/hooks/use-books";
import { SearchBooks } from "./search-books";
import { GradeTabs, LanguageTabs, TermTabs } from "./tabs";

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
          <h1 className="text-3xl my-2 md:text-4xl font-bold">Шығармалар</h1>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <GradeTabs
            grades={grades}
            grade={grade}
            localStorageKey="grade"
            setGrade={setGrade}
          />
          <LanguageTabs
            language={language}
            localStorageKey="language"
            setLanguage={setLanguage}
          />
          <TermTabs term={term} localStorageKey="term" setTerm={setTerm} />
        </div>

        <SearchBooks
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <div className="pb-3">
          <h2 className="text-2xl my-2 font-bold">{term}-тоқсан</h2>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {filteredBooks.map(
            (book) =>
              book.term === term && (
                <Link
                  key={book.id}
                  href={`/${book.id}`}
                  className="rounded bg-[#F8F8F8] p-8 min-w-[300px]"
                >
                  <h2 className="text-2xl font-bold">{book.title}</h2>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};
