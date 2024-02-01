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
      <div className="w-full m-6">{children}</div>
    </div>
  );
}
