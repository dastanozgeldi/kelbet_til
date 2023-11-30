import { NoAccess } from "@/components/no-access";
import { getServerAuthSession } from "@/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  if (session?.user.role !== "ADMIN") {
    return <NoAccess />;
  }
  return <div>welcome to admin page</div>;
}
