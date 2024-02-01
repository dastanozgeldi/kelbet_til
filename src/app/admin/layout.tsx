import { Header } from "@/components/admin/header";
import { Sidebar } from "@/components/admin/sidebar";
import { NoAccess } from "@/components/errors";
import { getServerAuthSession } from "@/server/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session?.user.role !== "ADMIN") {
    return <NoAccess />;
  }
  return (
    <div className="w-full grid grid-cols-[280px,1fr]">
      <div>
        <Sidebar />
      </div>
      <div className="my-5">
        <Header />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
