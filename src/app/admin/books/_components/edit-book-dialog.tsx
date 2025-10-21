"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Өзгерту
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Шығарманы өзгерту</DialogTitle>
        </DialogHeader>
        <EditBookForm book={book} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
