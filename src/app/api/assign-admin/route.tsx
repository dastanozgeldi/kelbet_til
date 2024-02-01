import { db } from "@/server/db";

interface UpdateUserBody {
  id: string;
  role: "ADMIN" | "USER";
}

export async function POST(request: Request) {
  const { id, role }: UpdateUserBody = await request.json();

  const user = await db.user.update({
    data: { role },
    where: { id },
  });

  return Response.json({ user });
}
