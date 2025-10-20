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
import TableSearch from "@/components/table-search";
import { CreateJournalDialog } from "./_components/create-journal-dialog";
import TableFallback from "@/components/table-fallback";
import JournalsTable from "./_components/journals-table";
import { auth } from "@/server/auth";

export const metadata: Metadata = {
  title: "Журналдар",
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const session = await auth();

  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Журналдар</CardTitle>
        <CardDescription>
          Деректер базасындағы журналдарды өңдеу және басқару
        </CardDescription>
        <CardAction>
          <div className="flex items-center gap-3">
            <TableSearch placeholder="Атауы бойынша іздеу..." />
            <CreateJournalDialog userId={session?.user.id!} />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense
          key={(query ?? "") + currentPage}
          fallback={<TableFallback columns={4} />}
        >
          <JournalsTable currentPage={currentPage} query={query} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
