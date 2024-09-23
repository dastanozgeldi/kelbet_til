import { useToast } from "@/components/ui/use-toast";
import { filters } from "@/config";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAddBook = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState({
    title: "",
    fileUrl: "",
    grade: filters.grades[0],
    language: filters.languages[0],
    term: filters.terms[0],
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // prisma call
    const res = await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const data = await res.json();

      toast({
        title: "Шығарма сәтті жүктелді",
        description: `Жүктелген шығарма: ${data.book.title}`,
      });
      return router.refresh();
    }

    toast({
      title: "Қате",
      description: res.statusText,
    });
  };

  return { data, setData, handleSubmit };
};
