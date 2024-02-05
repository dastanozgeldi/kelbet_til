import { db } from "@/server/db";
import { Books } from "./books";

export default async function Page() {
  const data = await db.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <Books data={data} />;
}
