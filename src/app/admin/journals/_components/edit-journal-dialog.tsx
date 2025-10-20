"use client";

import type { Journal } from "@prisma/client";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { EditJournalForm } from "./edit-journal-form";

export function EditJournalDialog({ journal }: { journal: Journal }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Өзгерту
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Журналды өзгерту</DialogTitle>
        </DialogHeader>
        <EditJournalForm journal={journal} />
      </DialogContent>
    </Dialog>
  );
}
