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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRightIcon, SearchIcon } from "lucide-react";

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
        <hr className="bg-primary h-[6px] max-w-[36px] border-0" />
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
          className="border-primary my-6 w-full rounded-lg border-[3px] p-3 pl-12"
          type="text"
          placeholder="Кітап немесе автордың атын енгізіңіз..."
          aria-label="Кітап немесе автордың атын енгізіңіз..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label htmlFor="search">
          <SearchIcon className="absolute top-1/2 left-4 size-5 -translate-y-1/2" />
        </label>
      </div>

      <div className="pb-3">
        <h2 className="my-2 text-2xl font-bold">{term}-тоқсан</h2>
        <hr className="bg-primary h-[6px] max-w-[36px] border-0" />
      </div>
      <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map(
          (book) =>
            book.term === term && (
              <Card key={book.id}>
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>
                    жүктелу күні: {book.createdAt.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button variant="outline" asChild>
                    <Link href={`/${book.id}`}>
                      Оқу
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ),
        )}
      </div>
    </div>
  );
};
