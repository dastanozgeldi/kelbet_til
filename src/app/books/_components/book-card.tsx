import { type Book } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default function BookCard({ book }: { book: Book }) {
  return (
    <Card key={book.id}>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>
          жүктелу күні: {book.createdAt.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button variant="outline" asChild>
          <Link href={`/${book.id}`}>
            Оқу
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
