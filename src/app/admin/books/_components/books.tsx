"use client";
import { type Book } from "@prisma/client";

import { SearchBooks } from "@/components/search-books";
import { GradeFilter, LanguageFilter, TermFilter } from "@/components/filters";

import { AddBook } from "./add-book";
import { BookActions } from "./book-actions";
import { useBooks } from "@/hooks/use-books";

export function Books({ data }: { data: Book[] }) {
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
    <div id="books">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <GradeFilter
            grade={grade}
            localStorageKey="admin-grade"
            setGrade={setGrade}
          />
          <LanguageFilter
            language={language}
            localStorageKey="admin-language"
            setLanguage={setLanguage}
          />
          <TermFilter
            term={term}
            localStorageKey="admin-term"
            setTerm={setTerm}
          />
        </div>
      </div>

      <SearchBooks searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{term}-тоқсан</h2>
          <hr className="h-[6px] max-w-[36px] bg-[#6C63FF]" />
        </div>
        <AddBook />
      </div>
      <div className="mt-3 flex flex-col gap-3 md:grid md:grid-cols-2 md:justify-items-center">
        {filteredBooks.map(
          (book) =>
            book.term === term && (
              <div key={book.id} className="w-full rounded-lg border p-3">
                <h1 className="text-lg font-semibold md:text-xl">
                  {book.title}
                </h1>

                <div className="flex items-center justify-between">
                  <span>{book.createdAt.toLocaleDateString()}</span>
                  <BookActions book={book} />
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
