import type { Program, Language } from "@prisma/client";
import { db } from "@/server/db";
import Filters from "./_components/filters";
import BookCard from "./_components/book-card";
import { PageHeader } from "../_components/page-header";
import BooksPagination from "./_components/books-pagination";

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

  return (
    <>
      <PageHeader title="Шығармалар" />

      <Filters />

      {books.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
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
      )}
    </>
  );
}
