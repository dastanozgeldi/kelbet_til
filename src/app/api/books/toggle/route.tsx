import type { BookStatus } from "@prisma/client";
import isBookActive from "@/helpers/is-book-active";
import { db } from "@/server/db";

export async function PATCH(request: Request) {
  const { id, status: current }: { id: string; status: BookStatus } =
    await request.json();

  const book = await db.book.update({
    where: { id },
    data: {
      status: isBookActive(current) ? "ARCHIVED" : "ACTIVE",
    },
  });

  return Response.json({ book });
}
