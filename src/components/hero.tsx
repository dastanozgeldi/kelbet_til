import Image from "next/image";
import { Search } from "./search";

export const Hero = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-between gap-8">
      <div className="w-1/2 space-y-8">
        <h1 className="text-4xl font-bold">Барлық НЗМ әдебиеті, бір жерде.</h1>
        <Search />
      </div>
      <div className="w-1/2">
        <Image
          className="w-full"
          src="/hero.png"
          alt="hero"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};
