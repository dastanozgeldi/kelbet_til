import { Metadata } from "next";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { PageHeader } from "../_components/page-header";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ArticlesGrid from "./_components/articles-grid";

export const metadata: Metadata = {
  title: "Мақалалар",
};

export default async function Page(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <PageHeader title="Мақалалар" />

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Skeleton className="h-10 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        }
      >
        <ArticlesGrid currentPage={currentPage} />
      </Suspense>
    </>
  );
}
