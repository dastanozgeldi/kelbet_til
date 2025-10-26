"use client";

import { Article } from "@prisma/client";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { EditArticleForm } from "./edit-article-form";

export function EditArticleDialog({ article }: { article: Article }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Өзгерту
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Мақаланы өзгерту</DialogTitle>
        </DialogHeader>
        <EditArticleForm article={article} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
