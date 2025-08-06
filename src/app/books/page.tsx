import { Books } from "@/components/books";
import { db } from "@/server/db";

export default async function BooksPage() {
  const data = await db.book.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <Books data={data} />;
}
