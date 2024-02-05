import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="min-h-[94vh] flex items-center">
      <div className="w-full flex flex-col items-center lg:flex-row lg:justify-between lg:gap-8">
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-3xl lg:text-4xl font-bold">
            НЗМ әдеби шығармалары бір жерде
          </h1>

          <div>
            <Link href="/#books">
              <Button
                variant="default"
                size="lg"
                className="text-xl bg-[#6C63FF] hover:bg-[#6C63FF]/90"
              >
                Бастау
              </Button>
            </Link>
          </div>
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
};
