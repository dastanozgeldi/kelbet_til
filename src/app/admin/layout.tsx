import { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/server/auth";
import { AdminSidebar } from "./admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s | KT Админ",
    default: "Админ",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") notFound();
  return (
    <SidebarProvider>
      <AdminSidebar user={session.user} />
      <div className="m-6 flex-1">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
