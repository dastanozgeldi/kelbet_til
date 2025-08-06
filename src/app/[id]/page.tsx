import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PDFBook } from "./_components/pdf-book";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { ChatDialog } from "./_components/chat-dialog";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <>
          <div className="mb-6">
            <Skeleton className="my-2 h-10 w-full" />
            <hr className="bg-primary h-[6px] max-w-[36px] border-0" />
          </div>
          <Skeleton className="h-[600px]" />
        </>
      }
    >
      <SuspenseBoundary id={id} />
    </Suspense>
  );
}

async function SuspenseBoundary({ id }: { id: string }) {
  const book = await db.book.findUnique({
    where: { id },
  });

  if (!book) notFound();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="mb-6">
          <h1 className="my-2 text-3xl font-bold md:text-4xl">{book.title}</h1>
          <hr className="bg-primary h-[6px] max-w-[36px] border-0" />
        </div>
        <ChatDialog book={book} />
      </div>
      <PDFBook book={book} />
    </>
  );
}
