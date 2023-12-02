import Link from "next/link";
import { type Book } from "@prisma/client";

import { cn } from "@/lib/utils";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { NoAccess } from "@/components/errors";
import { NoBooks } from "@/components/errors";

const WorkItem = ({ book }: { book: Book }) => {
  return (
    <div className="border rounded-lg w-full p-3">
      <div>
        <h1 className="text-xl font-semibold">{book.title}</h1>
        <span>{book.createdAt.toLocaleDateString()}</span>
      </div>
      <a
        href={book.fileUrl}
        className={cn(buttonVariants({ variant: "link" }), "p-0")}
      >
        {book.fileUrl}
      </a>
    </div>
  );
};

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
      {books.length > 0 ? (
        <div className="space-y-3">
          {books.map((book) => (
            <WorkItem key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <NoBooks />
      )}
    </div>
  );
}
