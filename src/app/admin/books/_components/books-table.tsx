import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { db } from "@/server/db";
import { BookActions } from "./book-actions";

const ITEMS_PER_PAGE = 10;

export default async function BooksTable({
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
            <TableHead>Аудитория</TableHead>
            <TableHead className="w-[100px]">Статус</TableHead>
            <TableHead className="w-[200px] text-right">Жүктелді</TableHead>
            <TableHead className="w-[100px] text-right">Әрекеттер</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.length > 0 ? (
            books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">{book.program}</Badge>
                    <Badge variant="outline">{book.grade} сынып</Badge>
                    <Badge variant="outline">{book.language}</Badge>
                    <Badge variant="outline">{book.term} тоқсан</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {book.status === "ACTIVE" ? "Сайтта" : "Архивте"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {book.createdAt.toLocaleString("ru-RU")}
                </TableCell>
                <TableCell className="flex justify-end">
                  <BookActions book={book} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-16 text-center">
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
