import { getServerAuthSession } from "@/server/auth";

export async function GET() {
  const session = await getServerAuthSession();

  return Response.json({ user: session?.user });
}
