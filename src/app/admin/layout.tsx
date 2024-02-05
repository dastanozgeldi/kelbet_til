import { Metadata } from "next";

import { Header, Sidebar } from "@/components/admin";
import { NoAccess } from "@/components/errors";
import { getServerAuthSession } from "@/server/auth";

export const metadata: Metadata = {
  title: {
    template: "%s | Админ",
    default: "Админ",
  },
};

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
        <Header user={session.user} />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
