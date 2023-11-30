import Image from "next/image";

export const NoAccess = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="space-y-6">
        <Image alt="no events" width={333} height={333} src="/no-access.svg" />
        <p className="text-center text-2xl font-bold">Құқығыңыз жоқ.</p>
      </div>
    </div>
  );
};
