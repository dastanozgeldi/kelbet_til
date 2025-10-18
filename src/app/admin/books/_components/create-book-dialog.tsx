"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CreateBookForm } from "./create-book-form";

export function CreateBookDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="size-4" />
          Жаңа
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Жаңа шығарма</DialogTitle>
        </DialogHeader>
        <CreateBookForm />
      </DialogContent>
    </Dialog>
  );
}
