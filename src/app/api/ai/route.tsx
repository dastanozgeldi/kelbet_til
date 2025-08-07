import { db } from "@/server/db";

// Toggle user's permission to use AI.
export async function PATCH(request: Request) {
  const { id, canUseAI } = await request.json();

  const user = await db.user.update({
    where: { id },
    data: { canUseAI: !canUseAI },
  });

  return Response.json({ user });
}
