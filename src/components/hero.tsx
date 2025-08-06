"use client";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="flex min-h-[94vh] items-center">
      <div className="flex w-full flex-col items-center lg:flex-row lg:justify-between lg:gap-8">
        <div className="space-y-8 lg:w-1/2">
          <h1 className="text-3xl font-bold lg:text-4xl">
            Республика мектептерінің әдеби шығармалары бір жерде
          </h1>

          <div>
            <Link href="/books">
              <Button
                variant="default"
                size="lg"
                className="bg-[#6C63FF] text-xl hover:bg-[#6C63FF]/90"
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
