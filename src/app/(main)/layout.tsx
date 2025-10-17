import Link from "next/link";
import Image from "next/image";
import SignInButton from "./_components/sign-in-button";
import { UserButton } from "./_components/user-button";
import { auth } from "@/server/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main className="container mx-auto flex min-h-screen flex-col space-y-3 px-6">
      <nav className="flex w-full items-center justify-between border-b border-border py-3">
        <Link href="/" className="flex items-center space-x-2.5">
          <Image src="/logo.png" width={32} height={32} alt="Logo" />
          <div className="text-xl font-bold">kelbet-til.kz</div>
        </Link>
        {!session?.user ? <SignInButton /> : <UserButton user={session.user} />}
      </nav>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-border mt-3 py-3 text-center">
        made with 🥰 by{" "}
        <a
          href="https://instagram.com/dastanozgeldi"
          className="font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          @dastanozgeldi
        </a>
      </footer>
    </main>
  );
}
