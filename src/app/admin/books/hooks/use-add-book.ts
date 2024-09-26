import { filters } from "@/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useAddBook = () => {
  const router = useRouter();
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

      toast.success("Шығарма сәтті жүктелді");
      return router.refresh();
    }

    toast.error("Шығарманы салуда ақаулық туындады");
  };

  return { data, setData, handleSubmit };
};
