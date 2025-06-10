import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t pt-4 text-center">
      made by{" "}
      <Link href="https://ozgeldi.tech" className="font-semibold underline">
        @dastanozgeldi
      </Link>
    </footer>
  );
}
