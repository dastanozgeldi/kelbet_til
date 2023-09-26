import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Works } from "@/components/works";

export default function Home() {
  return (
    <main className="min-h-screen px-8 lg:px-24 py-4">
      <Nav />
      <Hero />
      <Works />
    </main>
  );
}
