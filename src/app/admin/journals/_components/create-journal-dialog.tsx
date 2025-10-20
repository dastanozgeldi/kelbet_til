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
import { CreateJournalForm } from "./create-journal-form";

export function CreateJournalDialog({ userId }: { userId: string }) {
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
          <DialogTitle>Жаңа журнал</DialogTitle>
        </DialogHeader>
        <CreateJournalForm userId={userId} />
      </DialogContent>
    </Dialog>
  );
}
