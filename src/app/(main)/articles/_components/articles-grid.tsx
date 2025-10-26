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
import { db } from "@/server/db";
import GridPagination from "../../_components/grid-pagination";

const ITEMS_PER_PAGE = 9;

export default async function ArticlesGrid({
  currentPage,
}: {
  currentPage: number;
}) {
  const whereClause = {
    status: "PUBLISHED" as const,
  };

  const [articles, totalCount] = await Promise.all([
    db.article.findMany({
      where: whereClause,
      include: { user: true },
      orderBy: {
        createdAt: "desc",
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.article.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (!articles.length) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        Мақалалар табылмады
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>Автор: {article.user?.name}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button variant="outline" asChild>
                <Link href={`/articles/${article.slug}`}>
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
          <GridPagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
