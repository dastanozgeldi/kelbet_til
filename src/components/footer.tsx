import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t pt-4 text-center">
      әзірлеген{" "}
      <Link href="https://ozgeldi.tech" className="font-bold underline">
        @dastanozgeldi
      </Link>
    </footer>
  );
}
