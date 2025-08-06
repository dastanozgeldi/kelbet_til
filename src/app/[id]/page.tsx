"use client";

import { use } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useBook } from "./_hooks/use-book";
import { PDFBook } from "./_components/pdf-book";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { loading, book, user, history, loadHistory } = useBook(params.id);

  if (loading) {
    return (
      <div className="my-6 overflow-hidden">
        <div className="mb-6">
          <Skeleton className="my-2 h-10 w-full" />
          <hr className="bg-primary h-[6px] max-w-[36px] border-0" />
        </div>
        <Skeleton className="h-[600px]" />
      </div>
    );
  }
  return (
    book && (
      <div className="my-6 overflow-hidden">
        <div className="mb-6">
          <h1 className="my-2 text-3xl font-bold md:text-4xl">{book.title}</h1>
          <hr className="bg-primary h-[6px] max-w-[36px] border-0" />
        </div>
        <PDFBook
          book={book}
          user={user}
          history={history}
          loadHistory={loadHistory}
        />
      </div>
    )
  );
}
