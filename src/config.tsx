import { BookIcon, UsersIcon } from "lucide-react";

const links = [
  {
    href: "/admin/books",
    label: "Шығармалар",
    icon: <BookIcon className="size-5" />,
  },
  {
    href: "/admin/users",
    label: "Қолданушылар",
    icon: <UsersIcon className="size-5" />,
  },
];

const filters = {
  programs: ["JBBM", "NIS"],
  grades: ["5", "6", "7", "8", "9", "10", "11", "12"],
  languages: ["T1", "T2"],
  terms: ["1", "2", "3", "4"],
};

export { links, filters };
