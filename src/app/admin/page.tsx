import Link from "next/link";

import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { NoAccess } from "@/components/errors";
import { Works } from "@/components/admin/works";

export default async function Page() {
  const session = await getServerAuthSession();

  const books = await db.book.findMany({ orderBy: { createdAt: "desc" } });

  if (session?.user.role !== "ADMIN") {
    return <NoAccess />;
  }
  return (
    <div className="max-w-[60ch] mx-auto m-6">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Шығармалар</h1>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <Link href="/admin/new">
          <Button>Жаңа кітап</Button>
        </Link>
      </div>

      {/* list of books */}
      <Works books={books} />
    </div>
  );
}
