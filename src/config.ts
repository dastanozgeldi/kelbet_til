import { BookIcon, NewspaperIcon, NotebookIcon, UsersIcon } from "lucide-react";

export const links = [
  {
    title: "Шығармалар",
    url: "/admin/books",
    icon: BookIcon,
  },
  {
    title: "Журналдар",
    url: "/admin/journals",
    icon: NotebookIcon,
  },
  {
    title: "Мақалалар",
    url: "/admin/articles",
    icon: NewspaperIcon,
  },
  {
    title: "Қолданушылар",
    url: "/admin/users",
    icon: UsersIcon,
  },
];

export const filters = {
  programs: ["JBBM", "NIS"],
  grades: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  languages: ["T1", "T2"],
  terms: ["1", "2", "3", "4"],
};
