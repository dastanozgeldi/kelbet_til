import { Nav } from "@/components/nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "./google-analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Келбет Тіл",
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
        {children}
      </body>
    </html>
  );
}
