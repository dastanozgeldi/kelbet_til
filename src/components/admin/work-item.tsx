"use client";
import Link from "next/link";
import { type Book } from "@prisma/client";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";
import { DeleteButton } from "./delete-button";

export const WorkItem = ({ book }: { book: Book }) => {
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
          <Link
            href={{
              pathname: `/admin/books/edit/${book.id}`,
              query: {
                title: book.title,
                grade: book.grade,
                language: book.language,
                term: book.term,
              },
            }}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Өзгерту
          </Link>

          <DeleteButton book={book} />
        </div>
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
  );
};
