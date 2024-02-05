import { type Book } from "@prisma/client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const DeleteBook = ({ book }: { book: Book }) => {
  const { toast } = useToast();

  const handleClick = async () => {
    const res = await fetch("/api/delete-book", {
      method: "POST",
      body: JSON.stringify({ id: book.id }),
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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Жою
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Сіз сенімдісіз бе?</AlertDialogTitle>
          <AlertDialogDescription>
            Кітапты жойған соң оны қайтаруға болмайды.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Жоқ</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Иә</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
