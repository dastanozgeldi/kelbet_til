import { Metadata } from "next";
import { db } from "@/server/db";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export const metadata: Metadata = {
  title: "Қолданушылар",
};

const ITEMS_PER_PAGE = 10;

export default async function Page(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Қолданушылар</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Аты-жөні</TableHead>
                  <TableHead>Поштасы</TableHead>
                  <TableHead>Рөл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-5 w-[200px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[250px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[100px]" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
        >
          <SuspenseBoundary currentPage={currentPage} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function SuspenseBoundary({ currentPage }: { currentPage: number }) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [users, totalUsers] = await Promise.all([
    db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: { role: "desc" },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    db.user.count(),
  ]);

  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Аты-жөні</TableHead>
            <TableHead>Поштасы</TableHead>
            <TableHead>Рөл</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {user.role === "ADMIN" ? "Админ" : "Қолданушы"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/admin/users?page=${currentPage - 1}`}
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
                      href={`/admin/users?page=${page}`}
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
                href={`/admin/users?page=${currentPage + 1}`}
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
