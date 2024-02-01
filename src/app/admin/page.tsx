import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { NoAccess } from "@/components/errors";
import { Works } from "@/components/admin/works";

export default async function Page() {
  const session = await getServerAuthSession();

  const books = await db.book.findMany({ orderBy: { createdAt: "desc" } });

  if (session?.user.role !== "ADMIN") {
    return <NoAccess />;
  }
  return <Works books={books} />;
}
