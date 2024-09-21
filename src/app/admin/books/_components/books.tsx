import { db } from "@/server/db";
import { BookActions } from "./book-actions";

export async function Books({ query }: { query?: string }) {
  console.log("query", query);
  const books = await db.book.findMany({
    where: {
      title: { search: query?.trim().replace(/\s+/g, " & ") },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return books.length > 0 ? (
    <div className="mt-3 flex flex-col gap-3 md:grid md:grid-cols-2 md:justify-items-center">
      {books.map((book) => (
        <div key={book.id} className="w-full rounded-lg border p-3">
          <h1 className="text-lg font-semibold md:text-xl">{book.title}</h1>

          <div className="flex items-center justify-between">
            <span>{book.createdAt.toLocaleDateString()}</span>
            <BookActions book={book} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="mt-3 w-full rounded-lg border p-3 text-center text-muted-foreground">
      Шығарма табылған жоқ.
    </div>
  );
}
