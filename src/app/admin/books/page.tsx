import { Metadata } from "next";
import { db } from "@/server/db";
import { BooksTable } from "./_components/books-table";
import { columns } from "./_components/columns";
import { AddBook } from "./_components/add-book";
import Search from "./_components/search";

export const metadata: Metadata = {
  title: "Шығармалар",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query;

  const books = await db.book.findMany({
    where: {
      title: { search: query?.trim().replace(/\s+/g, " & ") },
    },
  });

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <Search placeholder="Атауы бойынша іздеу..." />
        <AddBook />
      </div>

      <BooksTable columns={columns} data={books} />

      {/* <Suspense
        key={query}
        fallback={
          <div className="mt-3 flex flex-col gap-3 md:grid md:grid-cols-2 md:justify-items-center">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        }
      >
        <Books query={query} />
      </Suspense> */}
    </>
  );
}
