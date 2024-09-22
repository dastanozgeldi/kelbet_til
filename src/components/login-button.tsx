import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

export async function LoginButton() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return <Link href="/api/auth/signin">Кіру</Link>;
  }
  return (
    <>
      {session.user.role === "ADMIN" ? (
        <Link href="/admin">Админ</Link>
      ) : (
        <Link href="/api/auth/signout">Шығу</Link>
      )}
    </>
  );
}
