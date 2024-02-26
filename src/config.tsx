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

const grades = ["7", "8", "9", "10", "11", "12"];
const languages = ["T1", "T2"];
const terms = ["1", "2", "3", "4"];

export { links, grades, languages, terms };
