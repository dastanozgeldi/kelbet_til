import { Metadata } from "next";

import { db } from "@/server/db";

import { Books } from "./books";

export const metadata: Metadata = {
  title: "Шығармалар",
};

export default async function Page() {
  const data = await db.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <Books data={data} />;
}
