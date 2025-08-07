export function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h2 className="my-2 text-2xl font-bold sm:text-3xl">{title}</h2>
      <hr className="bg-primary h-[6px] max-w-[36px] border-0" />
    </div>
  );
}
