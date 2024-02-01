import { Header } from "@/components/admin/header";
import { Sidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
