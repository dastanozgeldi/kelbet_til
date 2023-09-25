import { GradeSelector } from "@/components/grade-selector";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Works } from "@/components/works";

export default function Home() {
  return (
    <main className="min-h-screen px-24 py-4">
      <Nav />
      <Hero />
      <Works />
    </main>
  );
}
