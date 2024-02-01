import { User, columns } from "./columns";
import { data } from "./data";
import { DataTable } from "./data-table";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
}
