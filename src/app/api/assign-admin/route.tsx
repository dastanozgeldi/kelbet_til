import { type UserRole } from "@prisma/client";
import { db } from "@/server/db";

interface UpdateUserBody {
  id: string;
  role: UserRole;
}

export async function POST(request: Request) {
  const { id, role }: UpdateUserBody = await request.json();

  const user = await db.user.update({
    data: { role },
    where: { id },
  });

  return Response.json({ user });
}
