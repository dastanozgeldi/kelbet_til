import { type Language } from "@prisma/client";
import { db } from "@/server/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const book = await db.book.findUnique({
    where: {
      id: params.id,
    },
  });

  return Response.json({ book });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { data } = await request.json();

  const book = await db.book.update({
    where: {
      id: params.id,
    },
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const book = await db.book.delete({
    where: {
      id: params.id,
    },
  });

  return Response.json({ book });
}
