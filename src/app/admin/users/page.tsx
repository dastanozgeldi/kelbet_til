import { Metadata } from "next";

import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Қолданушылар",
};

export default async function Page() {
  const session = await getServerAuthSession();

  const users = await db.user.findMany({
    orderBy: { role: "desc" },
  });

  const data = users.filter((user) => user.id !== session?.user.id);

  return <DataTable columns={columns} data={data} />;
}
