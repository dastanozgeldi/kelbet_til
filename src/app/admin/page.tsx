import { db } from "@/server/db";
import { Works } from "@/components/admin/works";

export default async function Page() {
  const books = await db.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <Works books={books} />;
}
