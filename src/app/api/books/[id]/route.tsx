import { db } from "@/server/db";

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
