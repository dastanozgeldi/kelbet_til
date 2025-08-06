"use client";
import { type Book } from "@prisma/client";
import Link from "next/link";
import { useBooks } from "@/hooks/use-books";
import {
  GradeFilter,
  LanguageFilter,
  ProgramFilter,
  TermFilter,
} from "./filters";
import { Icons } from "./icons";

export const Books = ({ data }: { data: Book[] }) => {
  const {
    program,
    grade,
    language,
    term,
    searchValue,
    filteredBooks,
    setProgram,
    setGrade,
    setLanguage,
    setTerm,
    setSearchValue,
  } = useBooks(data);

  return (
    <div id="books" className="py-6">
      <div className="mb-6">
        <h1 className="my-2 text-3xl font-bold md:text-4xl">Шығармалар</h1>
        <hr className="h-[6px] max-w-[36px] border-0 bg-[#6C63FF]" />
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <ProgramFilter program={program} setProgram={setProgram} />
        <GradeFilter grade={grade} setGrade={setGrade} />
        <LanguageFilter language={language} setLanguage={setLanguage} />
        <TermFilter term={term} setTerm={setTerm} />
      </div>

      {/* search functionality */}
      <div className="relative">
        <input
          id="search"
          className="my-6 w-full rounded-lg border-[3px] border-[#6C63FF] p-3 pl-12"
          type="text"
          placeholder="Кітап немесе автордың атын енгізіңіз..."
          aria-label="Кітап немесе автордың атын енгізіңіз..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label htmlFor="search">
          <Icons.search
            className="absolute left-4 top-1/2 -translate-y-1/2"
            size={20}
          />
        </label>
      </div>

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
  );
};
