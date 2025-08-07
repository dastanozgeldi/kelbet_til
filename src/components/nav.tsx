import Link from "next/link";
import Image from "next/image";
import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import SignInButton from "./sign-in-button";

export const Nav = async () => {
  const session = await auth();

  return (
    <nav className="flex w-full items-center justify-between px-6 py-3">
      <Link href="/" className="flex items-center space-x-2.5">
        <Image src="/logo.png" width={32} height={32} alt="Logo" />
        <div className="text-xl font-bold">kelbet-til.kz</div>
      </Link>

      {!session?.user ? <SignInButton /> : <UserButton user={session.user} />}
    </nav>
  );
};
