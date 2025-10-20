import { Metadata } from "next";
import { Suspense } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableFallback from "@/components/table-fallback";
import TableSearch from "@/components/table-search";
import { UsersTable } from "./_components/users-table";

export const metadata: Metadata = {
  title: "Қолданушылар",
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
        <CardTitle>Қолданушылар</CardTitle>
        <CardDescription>
          Деректер базасындағы қолданушыларды басқару
        </CardDescription>
        <CardAction>
          <TableSearch placeholder="Аты-жөні немесе поштасы бойынша іздеу..." />
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense
          key={(query ?? "") + currentPage}
          fallback={<TableFallback columns={3} />}
        >
          <UsersTable currentPage={currentPage} query={query} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
