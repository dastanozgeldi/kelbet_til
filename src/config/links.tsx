import { Book, Plus, Users } from "lucide-react";

export const links = [
  {
    href: "/admin",
    label: "Шығармалар",
    icon: <Book width={20} height={20} />,
  },
  {
    href: "/admin/new",
    label: "Жаңа шығарма",
    icon: <Plus width={20} height={20} />,
  },
  {
    href: "/admin/users",
    label: "Қолданушылар",
    icon: <Users width={20} height={20} />,
  },
];
