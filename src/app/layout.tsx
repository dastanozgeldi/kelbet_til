import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import SignInButton from "@/components/sign-in-button";
import { UserButton } from "@/components/user-button";
import { auth } from "@/server/auth";
import { env } from "@/data/env/server";
import { GoogleAnalytics } from "./google-analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Келбет тіл",
    default: "Басты бет | Келбет тіл",
  },
  description:
    "Назарбаев Зияткерлік Мектептерінің қазақ тілі мен әдебиеті бағдарламасы бойынша шығармалар жинағы.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={env.GA_TRACKING_ID} />
      <body className="antialiased">
        <EdgeStoreProvider>
          <main className="container mx-auto space-y-3 px-6">
            <nav className="flex w-full items-center justify-between border-b py-3">
              <Link href="/" className="flex items-center space-x-2.5">
                <Image src="/logo.png" width={32} height={32} alt="Logo" />
                <div className="text-xl font-bold">kelbet-til.kz</div>
              </Link>

              {!session?.user ? (
                <SignInButton />
              ) : (
                <UserButton user={session.user} />
              )}
            </nav>

            {children}

            <footer className="border-t py-3 text-center">
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
        </EdgeStoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
