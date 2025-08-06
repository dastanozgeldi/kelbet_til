export function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h1 className="my-2 text-3xl font-bold md:text-4xl">{title}</h1>
      <hr className="bg-primary h-[6px] max-w-[36px] border-0" />
    </div>
  );
}
