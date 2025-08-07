export function PageHeader({
  title,
  button,
}: {
  title: string;
  button?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <hr className="bg-primary mt-1 h-[6px] max-w-[36px] border-0" />
      </div>
      {button}
    </div>
  );
}
