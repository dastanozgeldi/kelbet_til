import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PDFBook } from "./_components/pdf-book";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { ChatDialog } from "./_components/chat-dialog";
import { PageHeader } from "@/components/page-header";

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
            <Skeleton className="h-[32px] w-full sm:h-[36px]" />
            <hr className="bg-primary mt-1 h-[6px] max-w-[36px] border-0" />
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
      <PageHeader title={book.title} />
      <PDFBook book={book} />
    </>
  );
}
