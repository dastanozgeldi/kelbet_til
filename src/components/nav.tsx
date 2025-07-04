import { auth, signIn } from "@/server/auth";
import { Logo } from "./logo";
import { UserButton } from "./user-button";

export const Nav = async () => {
  const session = await auth();

  return (
    <nav className="flex w-full items-center justify-between">
      <Logo />

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
