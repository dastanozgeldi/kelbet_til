import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Toaster } from "@/components/ui/sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID!} />
      <body className="container mx-auto antialiased">
        <EdgeStoreProvider>
          <Nav />
          <main className="px-6">{children}</main>

          <footer className="mt-6 border-t py-3 px-6 text-center">
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
        </EdgeStoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
