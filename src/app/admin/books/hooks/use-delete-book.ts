import { useToast } from "@/components/ui/use-toast";
import type { Book } from "@prisma/client";

export const useDeleteBook = (book: Book) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    const res = await fetch(`/api/books/${book.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      return toast({
        title: "Шығарма сәтті жойылды",
        description: "Осы бетті қайта ашқанда шығарма жоқ болады.",
      });
    }

    toast({
      title: "Қате",
      description: res.statusText,
    });
  };

  return { handleDelete };
};
