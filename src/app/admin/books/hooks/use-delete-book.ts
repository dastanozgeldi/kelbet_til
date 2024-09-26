import type { Book } from "@prisma/client";
import { toast } from "sonner";

export const useDeleteBook = (book: Book) => {
  const handleDelete = async () => {
    const res = await fetch(`/api/books/${book.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      return toast.success("Шығарма сәтті жойылды");
    }

    toast.error("Шығарма жоюда ақаулық туындады");
  };

  return { handleDelete };
};
