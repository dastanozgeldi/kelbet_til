import Link from "next/link";

interface Props {
  name: string;
  grade: string;
  language: string;
}

export const WorkItem = ({ name, grade, language }: Props) => {
  return (
    <Link
      href={`/${grade}${language}=${name}`}
      className="rounded bg-[#F8F8F8] p-8 min-w-[300px]"
    >
      <h2 className="text-2xl font-bold">{name}</h2>
    </Link>
  );
};
