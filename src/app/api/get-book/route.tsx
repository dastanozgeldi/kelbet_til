import { db } from "@/server/db";

export async function POST(request: Request) {
  const data = await request.json();

  console.log("data", data);

  const book = await db.book.findUnique({
    where: {
      id: data.id,
    },
  });

  return Response.json({ book });
}
