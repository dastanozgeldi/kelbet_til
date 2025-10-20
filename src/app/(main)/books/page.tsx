import { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { PageHeader } from "../_components/page-header";
import Filters from "./_components/filters";
import BooksGrid from "./_components/books-grid";

export const metadata: Metadata = {
  title: "Шығармалар",
};

export default async function BooksPage(props: {
  searchParams?: Promise<{
    program?: string;
    grade?: string;
    language?: string;
    term?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <PageHeader title="Шығармалар" />
      <Filters />
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Skeleton className="h-10 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        }
      >
        <BooksGrid searchParams={searchParams} currentPage={currentPage} />
      </Suspense>
    </>
  );
}
