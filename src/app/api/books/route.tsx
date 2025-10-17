import { Language } from "@prisma/client";
import { db } from "@/server/db";

export async function POST(request: Request) {
  const data = await request.json();

  const book = await db.book.create({
    data: {
      program: "JBBM",
      title: data.title,
      fileUrl: data.fileUrl,
      grade: data.grade,
      language: data.language as Language,
      term: data.term,
    },
  });

  return Response.json({ book });
}
