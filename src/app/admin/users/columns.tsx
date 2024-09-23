"use client";

import { type User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { isAdmin } from "@/lib/utils";
import { UserDropdown } from "./user-dropdown";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Аты-жөні",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "email",
    header: "Пошта",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "role",
    header: "Рөл",
    cell: ({ row }) => (
      <Badge variant="outline">
        {isAdmin(row.getValue("role")) ? "Админ" : "Қолданушы"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <UserDropdown user={user} />;
    },
  },
];
