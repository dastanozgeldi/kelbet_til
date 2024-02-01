import { db } from "@/server/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
  const data = await db.user.findMany({
    orderBy: { role: "desc" },
  });

  return <DataTable columns={columns} data={data} />;
}
