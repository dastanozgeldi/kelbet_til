"use client";

import type { Book } from "@prisma/client";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { EditBookForm } from "./edit-book-form";

export function EditBookDialog({ book }: { book: Book }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Өзгерту
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Шығарманы өзгерту</DialogTitle>
        </DialogHeader>
        <EditBookForm book={book} />
      </DialogContent>
    </Dialog>
  );
}
