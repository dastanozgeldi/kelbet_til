import { Language } from "@prisma/client";
import { db } from "@/server/db";

export async function GET() {
  const books = await db.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json({ books });
}

export async function POST(request: Request) {
  const data = await request.json();

  const book = await db.book.create({
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
