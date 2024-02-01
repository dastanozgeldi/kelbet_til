"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { UserDropdown } from "./user-dropdown";

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: "ADMIN" | "USER";
};

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
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
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
