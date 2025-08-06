import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <section className="flex items-center">
      <div className="flex w-full flex-col items-center lg:flex-row lg:justify-between lg:gap-8">
        <div className="space-y-8 lg:w-1/2">
          <h1 className="text-3xl font-extrabold lg:text-4xl">
            Республика мектептерінің әдеби шығармалары бір жерде
          </h1>

          <Button size="lg" asChild>
            <Link href="/books">
              Бастау
              <ArrowRightIcon className="size-4" />
            </Link>
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
    </section>
  );
}
