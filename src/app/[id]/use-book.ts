import { useToast } from "@/components/ui/use-toast";
import { Book } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

export const useBook = (bookId: string) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<Book | null>(null);

  const [canUseAI, setCanUseAI] = useState(false);

  const loadUser = useCallback(async () => {
    const res = await fetch("/api/ai");
    const { canUseAI } = await res.json();

    setCanUseAI(canUseAI);
  }, []);

  const loadBook = useCallback(
    async (bookId: string) => {
      try {
        setLoading(true);

        const res = await fetch(`/api/books/${bookId}`);
        const { book } = await res.json();

        setBook(book);
      } catch {
        toast({
          title: "Шығарманы ашуда ақаулық туындады",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast],
  );

  useEffect(() => {
    loadBook(bookId);
    loadUser();
  }, [bookId, loadBook, loadUser]);

  return {
    loading,
    book,
    canUseAI,
  };
};
