import Nav from "./_components/nav";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto flex min-h-screen flex-col space-y-3 px-6">
      <Nav />
      <div className="flex-1">{children}</div>
      <footer className="border-border mt-3 border-t py-3 text-center">
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
  );
}
