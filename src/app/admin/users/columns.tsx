"use client";

import { type User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import { UserDropdown } from "./user-dropdown";

function translateRole(role: User["role"]) {
  switch (role) {
    case "ADMIN":
      return "Админ";
    case "USER":
      return "Қолданушы";
  }
}

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
      <Badge variant="outline">{translateRole(row.getValue("role"))}</Badge>
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
