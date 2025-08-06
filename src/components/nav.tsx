import Link from "next/link";
import Image from "next/image";
import { auth, signIn } from "@/server/auth";
import { UserButton } from "./user-button";

export const Nav = async () => {
  const session = await auth();

  return (
    <nav className="flex w-full items-center justify-between">
      <Link href="/" className="flex items-center space-x-2.5">
        <Image src="/logo.png" width={32} height={32} alt="Logo" />
        <div className="text-xl font-bold">kelbet-til.kz</div>
      </Link>

      {!session?.user ? (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="submit">Кіру</button>
        </form>
      ) : (
        <UserButton user={session.user} />
      )}
    </nav>
  );
};
