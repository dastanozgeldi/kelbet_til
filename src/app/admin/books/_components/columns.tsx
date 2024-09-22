"use client";

import { Badge } from "@/components/ui/badge";
import type { Book } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { BookActions } from "./book-actions";
import { isActive } from "@/lib/utils";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Атауы",
    cell: ({ row }) => row.getValue("title"),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => (
      <Badge variant="outline">
        {isActive(row.getValue("status")) ? "Сайтта" : "Архивте"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const book = row.original;
      return <BookActions book={book} />;
    },
  },
];
