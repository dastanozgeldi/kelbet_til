"use client";
import { type Book } from "@prisma/client";

import { SearchBooks } from "@/components/search-books";
import { GradeTabs, LanguageTabs, TermTabs } from "@/components/tabs";

import { NewBook } from "./new-book";
import { BookItem } from "./book-item";
import { useAdminBooks } from "./use-admin-books";

export function Books({ data }: { data: Book[] }) {
  const {
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
  } = useAdminBooks(data);

  return (
    <div id="books">
      <div className="flex items-end justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <GradeTabs
            grades={grades}
            grade={grade}
            localStorageKey="admin-grade"
            setGrade={setGrade}
          />
          <LanguageTabs
            language={language}
            localStorageKey="admin-language"
            setLanguage={setLanguage}
          />
          <TermTabs
            term={term}
            localStorageKey="admin-term"
            setTerm={setTerm}
          />
        </div>
        <NewBook />
      </div>

      <SearchBooks searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="pb-3">
        <h2 className="text-2xl my-2 font-bold">{term}-тоқсан</h2>
        <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
      </div>
      <div className="space-y-6 my-3">
        {filteredBooks.map(
          (book) => book.term === term && <BookItem key={book.id} book={book} />
        )}
      </div>
    </div>
  );
}
