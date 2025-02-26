import { Hero } from "@/components/hero";
import { Books } from "@/components/books";
import { db } from "@/server/db";

export default async function Home() {
  const data = await db.book.findMany({
    where: {
      program: "JBBM",
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Hero />
      <Books data={data} />
    </>
  );
}
