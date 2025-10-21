import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <div className="flex-1 flex flex-col items-center gap-6 lg:flex-row">
      <div className="mt-3">
        <h1 className="mb-3 text-3xl font-extrabold lg:mb-6 lg:text-4xl">
          Республика мектептерінің әдеби шығармалары бір жерде
        </h1>
        <Button asChild className="h-12 w-48 px-6 py-2 text-lg font-medium">
          <Link href="/books">Бастау</Link>
        </Button>
      </div>
      <Image
        className="mt-6 p-6 lg:mt-0 lg:max-w-4/10"
        alt="hero"
        src="/hero.svg"
        width={834}
        height={638}
      />
    </div>
  );
}
