import { db } from "@/server/db";

// Load user chat history for corresponding book.
export async function POST(request: Request) {
  const { userId, bookId } = await request.json();

  const messages = await db.message.findMany({
    where: { userId, bookId },
  });

  return Response.json({ messages });
}

// Toggle user's permission to use AI.
export async function PATCH(request: Request) {
  const { id, canUseAI } = await request.json();

  const user = await db.user.update({
    where: { id },
    data: { canUseAI: !canUseAI },
  });

  return Response.json({ user });
}
