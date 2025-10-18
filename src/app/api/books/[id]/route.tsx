import { type Language } from "@prisma/client";
import { db } from "@/server/db";

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
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
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const book = await db.book.delete({
    where: {
      id: params.id,
    },
  });

  return Response.json({ book });
}
