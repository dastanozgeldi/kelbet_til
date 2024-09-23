import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export async function GET() {
  const session = await getServerAuthSession();

  return Response.json({ canUseAI: session?.user.canUseAI ?? false });
}

export async function PATCH(request: Request) {
  const { id, canUseAI } = await request.json();

  const user = await db.user.update({
    where: { id },
    data: { canUseAI: !canUseAI },
  });

  return Response.json({ user });
}
