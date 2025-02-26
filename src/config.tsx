import { Icons } from "@/components/icons";

const links = [
  {
    href: "/admin/books",
    label: "Шығармалар",
    icon: <Icons.book width={20} height={20} />,
  },
  {
    href: "/admin/users",
    label: "Қолданушылар",
    icon: <Icons.users width={20} height={20} />,
  },
];

const filters = {
  programs: ["JBBM", "NIS"],
  grades: ["5", "6", "7", "8", "9", "10", "11", "12"],
  languages: ["T1", "T2"],
  terms: ["1", "2", "3", "4"],
};

export { links, filters };
