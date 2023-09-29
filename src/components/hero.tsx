import Image from "next/image";
import { Search } from "./search";

export const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="w-full flex flex-col items-center lg:flex-row lg:justify-between lg:gap-8">
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-3xl lg:text-4xl font-bold">
            НЗМ әдеби шығармалары, бір жерде.
          </h1>
          <Search />
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
