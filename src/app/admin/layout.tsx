import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

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

  if (session?.user.role !== "ADMIN") return notFound();
  return (
    <div className="grid w-full grid-cols-[64px,1fr] md:grid-cols-[256px,1fr]">
      <div className="my-6">
        <Sidebar />
      </div>

      <div className="my-5 md:ml-6">
        <Header user={session.user} />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
