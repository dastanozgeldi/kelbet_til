import { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { PageHeader } from "../_components/page-header";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Мақалалар",
};

export default async function Page() {
  return (
    <>
      <PageHeader title="Мақалалар" />

      <Suspense fallback={<>loading articles...</>}>
        <ArticlesGrid />
      </Suspense>
    </>
  );
}

async function ArticlesGrid() {
  const articles = await db.article.findMany({ take: 9 });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article.id}>
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription className="flex flex-wrap gap-1">
              {article.description}
            </CardDescription>
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
  );
}
