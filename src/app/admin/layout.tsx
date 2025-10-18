import { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/server/auth";
import { AdminSidebar } from "./_components/admin-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminHeader from "./_components/admin-header";

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
      <SidebarInset>
        <AdminHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
