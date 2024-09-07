import { useToast } from "@/components/ui/use-toast";
import { Book } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

export const useBook = (bookId: string) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<Book | null>(null);

  const loadBook = useCallback(
    async (bookId: string) => {
      try {
        setLoading(true);

        const res = await fetch(`/api/book/${bookId}`);
        const { book } = await res.json();

        setBook(book);
      } catch {
        toast({
          title: "Қате",
          description: "Кітап жүктелмеді",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    loadBook(bookId);
  }, [bookId, loadBook]);

  return {
    loading,
    book,
  };
};
