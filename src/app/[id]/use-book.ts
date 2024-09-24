import { useToast } from "@/components/ui/use-toast";
import type { Message, Book } from "@prisma/client";
import type { User } from "next-auth";
import { useCallback, useEffect, useState } from "react";

export const useBook = (bookId: string) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<Message[]>([]);

  const loadUser = useCallback(async () => {
    const res = await fetch("/api/me");
    const { user } = await res.json();

    setUser(user);
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

  const loadHistory = useCallback(async () => {
    if (!user?.id || !book?.id) return;

    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ userId: user?.id, bookId: book?.id }),
    });
    const { messages } = await res.json();

    setHistory(messages);
  }, [user?.id, book?.id]);

  useEffect(() => {
    loadBook(bookId);
    loadUser();
    loadHistory();
  }, [bookId, loadBook, loadUser, loadHistory]);

  return {
    loading,
    book,
    user,
    history,
    loadHistory,
  };
};
