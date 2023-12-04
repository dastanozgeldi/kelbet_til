import { Hero } from "@/components/hero";
import { Works } from "@/components/works";
import { db } from "@/server/db";

export default async function Home() {
  const books = await db.book.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <Hero />
      <Works books={books} />
    </>
  );
}
