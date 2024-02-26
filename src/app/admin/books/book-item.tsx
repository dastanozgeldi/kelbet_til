"use client";
import { type Book } from "@prisma/client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { EditBook } from "./edit-book";
import { DeleteBook } from "./delete-book";

export const BookItem = ({ book }: { book: Book }) => {
  return (
    <div className="border rounded-lg w-full p-3">
      {/* info */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{book.title}</h1>
          <span>{book.createdAt.toLocaleDateString()}</span>
        </div>
      </div>

      {/* actions */}
      <div className="flex items-center justify-between">
        <div className="space-x-3">
          <EditBook book={book} />
          <DeleteBook book={book} />
        </div>
        <div className="space-x-3">
          <Link
            href={`/${book.id}`}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Оқу
          </Link>
          <a
            href={book.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Жүктеу
          </a>
        </div>
      </div>
    </div>
  );
};
