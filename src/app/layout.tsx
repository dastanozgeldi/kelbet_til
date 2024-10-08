import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { buttonVariants } from "@/components/ui/button";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { cn } from "@/lib/utils";

import { GoogleAnalytics } from "./google-analytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Келбет тіл",
    default: "Басты бет | Келбет тіл",
  },
  description:
    "Назарбаев Зияткерлік Мектептерінің қазақ тілі мен әдебиеті бағдарламасы бойынша шығармалар жинағы.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID!} />
      <body className={cn(inter.className, "min-h-screen px-6 py-4 lg:px-24")}>
        <EdgeStoreProvider>
          <main>
            <div className="-mt-2 mb-4 flex w-full flex-col items-center justify-between sm:flex-row">
              платформа бойынша пікір қалдырыңыз!
              <a
                href="https://forms.gle/RyySDQM5GwqXoLUV7"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full sm:w-auto",
                )}
              >
                сауалнаманы өту
              </a>
            </div>

            <Nav />
            {children}
            <Footer />
          </main>
        </EdgeStoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
