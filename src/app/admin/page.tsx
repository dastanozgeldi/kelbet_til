import Link from "next/link";

import { NoAccess } from "@/components/no-access";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  const books = await db.book.findMany();

  if (session?.user.role !== "ADMIN") {
    return <NoAccess />;
  }
  return (
    <div className="max-w-[60ch] mx-auto m-6">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div className="pb-3 mt-3">
          <h2 className="text-2xl font-bold">Кітаптар</h2>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <Link href="/admin/new">
          <Button>Жаңа кітап</Button>
        </Link>
      </div>

      {/* list of books */}
      <div className="flex flex-col items-center justify-between">
        {books.map((book) => (
          <div key={book.id}>{book.fileUrl}</div>
        ))}
      </div>
    </div>
  );
}
