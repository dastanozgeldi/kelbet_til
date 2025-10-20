import { Suspense } from "react";
import { PageHeader } from "../_components/page-header";
import { db } from "@/server/db";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default async function Page() {
  return (
    <>
      <PageHeader title="Kelbet-Til Журналы" />
      <Suspense fallback={<>journals loading...</>}>
        <SuspenseBoundary />
      </Suspense>
    </>
  );
}

async function SuspenseBoundary() {
  const journals = await db.journal.findMany({
    where: { status: "PUBLISHED" },
    include: { user: true },
  });

  if (!journals.length) {
    return <div>Журналдар табылмады.</div>;
  }
  return (
    <div className="space-y-6">
      {journals.map((journal) => (
        <Card key={journal.id}>
          <CardHeader>
            <CardTitle>{journal.title}</CardTitle>
            {journal.user && (
              <CardDescription>Автор: {journal.user.name}</CardDescription>
            )}
          </CardHeader>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href={`/journals/${journal.id}`}>
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
