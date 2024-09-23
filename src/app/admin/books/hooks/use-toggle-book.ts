import { useToast } from "@/components/ui/use-toast";
import { isActive } from "@/lib/utils";
import { Book } from "@prisma/client";

export const useToggleBook = (book: Book) => {
  const { toast } = useToast();

  const handleToggle = async () => {
    const res = await fetch("/api/books/toggle", {
      method: "PATCH",
      body: JSON.stringify({ id: book.id, status: book.status }),
    });

    if (res.ok) {
      return toast({
        title: `Шығарма сәтті ${isActive(book.status) ? "архивке салынды" : "архивтен шығарылды"}`,
      });
    }

    toast({
      title: "Шығарманы өзгертуде ақаулық туындады",
    });
  };

  return { handleToggle };
};
