import { Metadata } from "next";
import { db } from "@/server/db";
import { BooksTable } from "./_components/books-table";
import { columns } from "./_components/columns";
import { AddBook } from "./_components/add-book";
import Search from "./_components/search";

export const metadata: Metadata = {
  title: "Шығармалар",
};

export default async function Page(
  props: {
    searchParams?: Promise<{ query?: string }>;
  }
) {
  const searchParams = await props.searchParams;
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
    </>
  );
}
