import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="flex w-full flex-col items-center gap-3 lg:flex-row lg:justify-between">
      <div className="lg:w-1/2">
        <h1 className="mb-3 text-3xl font-extrabold lg:mb-6 lg:text-4xl">
          Республика мектептерінің әдеби шығармалары бір жерде
        </h1>

        <Button asChild className="h-12 w-60 px-6 py-2 text-lg font-medium">
          <Link href="/books">Бастау</Link>
        </Button>
      </div>
      <div className="lg:w-1/2">
        <Image
          className="w-full"
          src="/hero.png"
          alt="hero"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
