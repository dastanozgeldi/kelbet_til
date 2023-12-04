import { db } from "@/server/db";

export async function POST(request: Request) {
  const data = await request.json();

  const book = await db.book.delete({
    where: {
      id: data.id,
    },
  });

  return Response.json({ book });
}
