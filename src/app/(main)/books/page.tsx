import type { Program, Language } from "@prisma/client";
import { db } from "@/server/db";
import Filters from "./_components/filters";
import BookCard from "./_components/book-card";
import { PageHeader } from "../_components/page-header";

export default async function BooksPage(props: {
  searchParams?: Promise<{
    program?: string;
    grade?: string;
    language?: string;
    term?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const books = await db.book.findMany({
    where: {
      program: searchParams?.program as Program | undefined,
      grade: searchParams?.grade,
      language: searchParams?.language as Language | undefined,
      term: searchParams?.term,
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "desc",
    },
    // TODO: implement infinite scroll or something similar
    take: 10,
  });

  return (
    <>
      <PageHeader title="Шығармалар" />

      <Filters />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
