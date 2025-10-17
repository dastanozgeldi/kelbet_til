import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-2">
      <div className="mt-3">
        <h1 className="mb-3 text-3xl font-extrabold lg:mb-6 lg:text-4xl">
          Республика мектептерінің әдеби шығармалары бір жерде
        </h1>
        <Button asChild className="h-12 w-48 px-6 py-2 text-lg font-medium">
          <Link href="/books">Бастау</Link>
        </Button>
      </div>
      <Image
        className="w-full"
        alt="hero"
        src="/hero.png"
        width={500}
        height={500}
      />
    </div>
  );
}
