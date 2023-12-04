import Link from "next/link";

interface Props {
  id: string;
  name: string;
}

export const WorkItem = ({ id, name }: Props) => {
  return (
    <Link href={`/${id}`} className="rounded bg-[#F8F8F8] p-8 min-w-[300px]">
      <h2 className="text-2xl font-bold">{name}</h2>
    </Link>
  );
};
