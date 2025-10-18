"use client";

import { EyeIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Book } from "@prisma/client";
import Link from "next/link";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteBook } from "../hooks/use-delete-book";
import { EditBookForm } from "./edit-book-form";

export const BookActions = ({ book }: { book: Book }) => {
  const { handleDelete } = useDeleteBook(book);

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: book.fileUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to get download URL");
      }

      const { signedUrl } = await response.json();
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Файлды жүктеу кезінде қате пайда болды");
    }
  };

  return (
    <div className="flex items-center">
      <Button asChild variant="ghost" size="icon" className="h-8 w-8 p-0">
        <Link href={`/${book.id}`}>
          <EyeIcon />
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
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
          <DropdownMenuItem onSelect={handleDownload}>Жүктеу</DropdownMenuItem>
          <DropdownMenuSeparator />
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
                <AlertDialogAction onClick={handleDelete}>Иә</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
