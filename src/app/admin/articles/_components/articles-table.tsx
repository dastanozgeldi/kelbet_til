import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/server/db";
import ArticleActions from "./article-actions";

const ITEMS_PER_PAGE = 10;

export default async function ArticlesTable({
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

  const [articles, totalArticles] = await Promise.all([
    db.article.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    db.article.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);

  // Build query params for pagination links
  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    params.set("page", page.toString());
    return `/admin/articles?${params.toString()}`;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Тақырыбы</TableHead>
            <TableHead className="w-[100px]">Статус</TableHead>
            <TableHead className="w-[200px] text-right">Жүктелді</TableHead>
            <TableHead className="w-[100px] text-right">Әрекеттер</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length > 0 ? (
            articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {article.status === "PUBLISHED"
                      ? "Сайтта"
                      : article.status === "DRAFT"
                        ? "Черновик"
                        : "Архивте"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {article.createdAt.toLocaleString("ru-RU")}
                </TableCell>
                <TableCell className="flex justify-end">
                  <ArticleActions article={article} />
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
    </>
  );
}
