import type { Program, Language, Prisma } from "@prisma/client";
import { db } from "@/server/db";
import Filters from "./_components/filters";
import BookCard from "./_components/book-card";
import { PageHeader } from "../_components/page-header";
import BooksPagination from "./_components/books-pagination";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Шығармалар",
};

const ITEMS_PER_PAGE = 9;

export default async function BooksPage(props: {
  searchParams?: Promise<{
    program?: string;
    grade?: string;
    language?: string;
    term?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const whereClause = {
    program: searchParams?.program as Program | undefined,
    grade: searchParams?.grade,
    language: searchParams?.language as Language | undefined,
    term: searchParams?.term,
    status: "ACTIVE" as const,
  };

  return (
    <>
      <PageHeader title="Шығармалар" />
      <Filters />
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Skeleton className="h-10 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        }
      >
        <SuspenseBoundary whereClause={whereClause} currentPage={currentPage} />
      </Suspense>
    </>
  );
}

async function SuspenseBoundary({
  whereClause,
  currentPage,
}: {
  whereClause: Prisma.BookWhereInput;
  currentPage: number;
}) {
  const [books, totalCount] = await Promise.all([
    db.book.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.book.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return books.length === 0 ? (
    <div className="text-muted-foreground py-12 text-center">
      Шығармалар табылмады
    </div>
  ) : (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <BooksPagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
