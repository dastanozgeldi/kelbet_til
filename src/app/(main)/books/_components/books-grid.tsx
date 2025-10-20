import type { Program, Language } from "@prisma/client";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/server/db";
import BooksPagination from "./books-pagination";

const ITEMS_PER_PAGE = 9;

export default async function BooksGrid({
  searchParams,
  currentPage,
}: {
  searchParams?: {
    program?: string;
    grade?: string;
    language?: string;
    term?: string;
  };
  currentPage: number;
}) {
  const whereClause = {
    program: searchParams?.program as Program | undefined,
    grade: searchParams?.grade,
    language: searchParams?.language as Language | undefined,
    term: searchParams?.term,
    status: "ACTIVE" as const,
  };

  const [books, totalCount] = await Promise.all([
    db.book.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.book.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!books.length) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        Шығармалар табылмады
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription className="flex flex-wrap gap-1">
                <Badge>{book.grade}-сынып</Badge>
                <Badge>{book.term}-тоқсан</Badge>
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button variant="outline" asChild>
                <Link href={`/${book.id}`}>
                  Оқу
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <BooksPagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
