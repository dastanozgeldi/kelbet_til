import { auth } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";
import SignInButton from "./sign-in-button";
import { UserButton } from "./user-button";
import { NavMenu } from "./nav-menu";

export default async function Nav() {
  const session = await auth();

  return (
    <nav className="border-border grid w-full grid-cols-4 items-center border-b py-3">
      <Link href="/" className="col-span-2 h-9 md:col-span-1">
        <Image src="/logo.png" width={57} height={36} alt="Logo" />
      </Link>

      <div className="col-span-2 hidden justify-center md:flex">
        <NavMenu />
      </div>

      <div className="col-span-2 flex justify-end md:col-span-1">
        {!session?.user ? <SignInButton /> : <UserButton user={session.user} />}
      </div>
    </nav>
  );
}
