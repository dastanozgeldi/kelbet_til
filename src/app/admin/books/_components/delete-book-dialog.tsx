"use client";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteBook } from "../actions";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteBookDialog({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => e.preventDefault()}
        >
          Жою
        </DropdownMenuItem>
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
          <AlertDialogAction
            disabled={isPending}
            onClick={async () => {
              startTransition(async () => {
                const result = await deleteBook(id);

                if (result.success) {
                  toast.success(result.message);
                } else {
                  toast.error(result.message);
                }
              });
            }}
          >
            Иә
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
