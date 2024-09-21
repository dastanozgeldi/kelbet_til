import { Metadata } from "next";
import { Books } from "./_components/books";
import Search from "./_components/search";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Шығармалар",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query;

  return (
    <>
      {/* <div className="flex items-end justify-between">
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
      </div> */}

      <Search placeholder="Шығарма атауын енгізіңіз..." />
      {/* <SearchBooks searchValue={searchValue} setSearchValue={setSearchValue} /> */}

      {/* <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{term}-тоқсан</h2>
          <hr className="h-[6px] max-w-[36px] bg-[#6C63FF]" />
        </div>
        <AddBook />
      </div> */}

      <Suspense
        key={query}
        fallback={
          <div className="mt-3 flex flex-col gap-3 md:grid md:grid-cols-2 md:justify-items-center">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        }
      >
        <Books query={query} />
      </Suspense>
    </>
  );
}
