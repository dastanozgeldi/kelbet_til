import { useToast } from "@/components/ui/use-toast";
import type { Language, Book } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditBookFormValues {
  title: string;
  grade: string;
  language: Language;
  term: string;
}

export const useEditBook = (book: Book) => {
  const router = useRouter();
  const { toast } = useToast();

  const [data, setData] = useState<EditBookFormValues>({
    title: book.title,
    grade: book.grade,
    language: book.language,
    term: book.term,
  });

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // prisma call
    const res = await fetch(`/api/books/${book.id}`, {
      method: "PATCH",
      body: JSON.stringify({ data }),
    });

    if (res.ok) {
      const data = await res.json();

      toast({
        title: "Шығарма сәтті өзгертілді",
        description: `Өзгертілген шығарма: ${data.book.title}`,
      });
      return router.refresh();
    }

    toast({
      title: "Қате",
      description: res.statusText,
    });
  };

  return { data, setData, handleEdit };
};
