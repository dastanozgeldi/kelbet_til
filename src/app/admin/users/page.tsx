import { Metadata } from "next";
import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { columns } from "./columns";
import { UsersTable } from "./users-table";
import { User } from "next-auth";

export const metadata: Metadata = {
  title: "Қолданушылар",
};

export default async function Page() {
  const session = await auth();

  const users = await db.user.findMany({
    orderBy: { role: "desc" },
  });

  const data = users.filter((user: User) => user.id !== session?.user.id);

  return <UsersTable columns={columns} data={data} />;
}
