import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { Nav } from "@/components/nav";
import { cn } from "@/lib/utils";
import { EdgeStoreProvider } from "@/lib/edgestore";

import { GoogleAnalytics } from "./google-analytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Келбет тіл",
    default: "Басты бет | Келбет тіл"
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
      <body className={cn(inter.className, "min-h-screen px-8 lg:px-24 py-4")}>
        <Nav />
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
