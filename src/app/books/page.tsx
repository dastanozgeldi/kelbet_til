import type { Program, Language } from "@prisma/client";
import { db } from "@/server/db";
import Filters from "./_components/filters";
import BookCard from "./_components/book-card";

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
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="my-2 text-3xl font-bold md:text-4xl">Шығармалар</h1>
        <hr className="bg-primary h-[6px] max-w-[36px] border-0" />
      </div>

      <Filters />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
