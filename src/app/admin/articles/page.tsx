import { Metadata } from "next";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import TableSearch from "@/components/table-search";
import TableFallback from "@/components/table-fallback";
import { CreateArticleDialog } from "./_components/create-article-dialog";
import ArticlesTable from "./_components/articles-table";

export const metadata: Metadata = {
  title: "Мақалалар",
};

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
            <TableSearch placeholder="Атауы бойынша іздеу..." />
            <CreateArticleDialog />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense
          key={(query ?? "") + currentPage}
          fallback={<TableFallback columns={4} />}
        >
          <ArticlesTable currentPage={currentPage} query={query} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
