import { Metadata } from "next";
import { db } from "@/server/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Қолданушылар",
};

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuspenseBoundary />
    </Suspense>
  );
}

async function SuspenseBoundary() {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
    orderBy: { role: "desc" },
    take: 10,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Аты-жөні</TableHead>
          <TableHead>Поштасы</TableHead>
          <TableHead>Рөл</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant="outline">
                {user.role === "ADMIN" ? "Админ" : "Қолданушы"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
