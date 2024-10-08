import { isActive } from "@/lib/utils";
import { db } from "@/server/db";
import type { BookStatus } from "@prisma/client";

export async function PATCH(request: Request) {
  const { id, status: current }: { id: string; status: BookStatus } =
    await request.json();

  const book = await db.book.update({
    where: { id },
    data: {
      status: isActive(current) ? "ARCHIVED" : "ACTIVE",
    },
  });

  return Response.json({ book });
}
