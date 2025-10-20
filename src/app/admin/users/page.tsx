import { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableFallback from "@/components/table-fallback";
import { UsersTable } from "./_components/users-table";

export const metadata: Metadata = {
  title: "Қолданушылар",
};

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
        <Suspense fallback={<TableFallback columns={3} />}>
          <UsersTable currentPage={currentPage} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
