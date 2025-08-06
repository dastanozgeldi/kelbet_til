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
      <body className="container mx-auto my-6 antialiased">
        <EdgeStoreProvider>
          <main>
            <Nav />
            {children}
            <footer className="border-t pt-3 text-center">
              made with 🥰 by{" "}
              <a href="https://ozgeldi.tech" className="font-semibold">
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
