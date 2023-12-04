import { db } from "@/server/db";
import { Language } from "@prisma/client";

export async function POST(request: Request) {
  const { id, data } = await request.json();

  const book = await db.book.update({
    where: { id },
    data: {
      title: data.title,
      fileUrl: data.fileUrl,
      grade: data.grade,
      language: data.language as Language,
      term: data.term,
    },
  });

  return Response.json({ book });
}
