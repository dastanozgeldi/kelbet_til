import { Metadata } from "next";
import { db } from "@/server/db";
import Search from "./_components/search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import isBookActive from "@/helpers/is-book-active";
import { BookActions } from "./_components/book-actions";
import { CreateBookDialog } from "./_components/create-book-dialog";

export const metadata: Metadata = {
  title: "Шығармалар",
};

const ITEMS_PER_PAGE = 10;

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Шығармалар</CardTitle>
        <CardDescription>
          Деректер базасындағы шығармаларды өңдеу және басқару
        </CardDescription>
        <CardAction>
          <div className="flex items-center gap-3">
            <Search placeholder="Атауы бойынша іздеу..." />
            <CreateBookDialog />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense
          key={(query ?? "") + currentPage}
          fallback={
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Атауы</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="w-[100px]">Әрекеттер</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-5 w-[300px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[80px]" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
        >
          <SuspenseBoundary currentPage={currentPage} query={query} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function SuspenseBoundary({
  currentPage,
  query,
}: {
  currentPage: number;
  query?: string;
}) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereClause = query
    ? { title: { search: query.trim().replace(/\s+/g, " & ") } }
    : {};

  const [books, totalBooks] = await Promise.all([
    db.book.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    db.book.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalBooks / ITEMS_PER_PAGE);

  // Build query params for pagination links
  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    params.set("page", page.toString());
    return `/admin/books?${params.toString()}`;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Атауы</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Әрекеттер</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.length > 0 ? (
            books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {isBookActive(book.status) ? "Сайтта" : "Архивте"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end">
                  <BookActions book={book} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {query ? "Шығарма табылмады." : "Шығарма жоқ."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={buildHref(currentPage - 1)}
                aria-disabled={currentPage === 1}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={buildHref(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href={buildHref(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
