import type { Language, Book } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface EditBookFormValues {
  title: string;
  grade: string;
  language: Language;
  term: string;
}

export const useEditBook = (book: Book) => {
  const router = useRouter();

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
      toast.success("Шығарма сәтті өзгертілді");
      return router.refresh();
    }

    toast.error("Шығарманы өзгертуде ақаулық туындады");
  };

  return { data, setData, handleEdit };
};
