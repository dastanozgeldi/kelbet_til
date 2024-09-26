import { isActive } from "@/lib/utils";
import { Book } from "@prisma/client";
import { toast } from "sonner";

export const useToggleBook = (book: Book) => {
  const handleToggle = async () => {
    const res = await fetch("/api/books/toggle", {
      method: "PATCH",
      body: JSON.stringify({ id: book.id, status: book.status }),
    });

    if (res.ok) {
      return toast.success(
        `Шығарма сәтті ${isActive(book.status) ? "архивке салынды" : "архивтен шығарылды"}`,
      );
    }

    toast.error("Шығарманы өзгертуде ақаулық туындады");
  };

  return { handleToggle };
};
