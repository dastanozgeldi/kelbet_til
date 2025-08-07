"use client";

import type { UserRole, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
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
    cell: ({ row }) => {
      const role = row.getValue("role") as UserRole;
      const isAdmin = role === "ADMIN";
      return <Badge variant="outline">{isAdmin ? "Админ" : "Қолданушы"}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <UserDropdown user={user} />;
    },
  },
];
