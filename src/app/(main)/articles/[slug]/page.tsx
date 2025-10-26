import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { PageHeader } from "../../_components/page-header";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <>
          <div className="mb-6">
            <Skeleton className="h-[32px] w-3/4 sm:h-[36px]" />
            <hr className="bg-primary mt-1 h-[6px] max-w-[36px] border-0" />
            <Skeleton className="mt-3 h-6 w-3/4" />
          </div>
          <Skeleton className="h-[500px]" />
        </>
      }
    >
      <SuspenseBoundary slug={slug} />
    </Suspense>
  );
}

async function SuspenseBoundary({ slug }: { slug: string }) {
  const article = await db.article.findUnique({
    where: { slug },
    include: { user: true },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!article) notFound();
  return (
    <>
      <PageHeader
        title={article.title}
        description={article.description || undefined}
      />

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <p className="text-muted-foreground text-center text-sm">
        Автор: {article.user?.name}
      </p>
    </>
  );
}
