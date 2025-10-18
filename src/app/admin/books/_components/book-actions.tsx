"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language, type Book } from "@prisma/client";
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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteBook } from "../hooks/use-delete-book";
import { useEditBook } from "../hooks/use-edit-book";
import { filters } from "@/data/config";

export const BookActions = ({ book }: { book: Book }) => {
  const { data, setData, handleEdit } = useEditBook(book);
  const { handleDelete } = useDeleteBook(book);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <MoreHorizontal className="h-4 w-4" />
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
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title">Кітап атауы</Label>
                <Input
                  id="title"
                  type="text"
                  value={data.title || ""}
                  placeholder="Абай жолы"
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="grade">Сынып</Label>
                <select
                  id="grade"
                  className="w-full rounded-md border bg-transparent px-3 py-2"
                  defaultValue={data.grade || filters.grades[0]}
                  onChange={(e) => setData({ ...data, grade: e.target.value })}
                >
                  {filters.grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="language">Тіл</Label>
                <select
                  id="language"
                  className="w-full rounded-md border bg-transparent px-3 py-2"
                  defaultValue={data.language || filters.languages[0]}
                  onChange={(e) =>
                    setData({ ...data, language: e.target.value as Language })
                  }
                >
                  {filters.languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="term">Тоқсан</Label>
                <select
                  id="term"
                  className="w-full rounded-md border bg-transparent px-3 py-2"
                  defaultValue={data.term || filters.terms[0]}
                  onChange={(e) => setData({ ...data, term: e.target.value })}
                >
                  {filters.terms.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
              </div>
              <Button>Сақтау</Button>
            </form>
          </DialogContent>
        </Dialog>
        <DropdownMenuItem asChild>
          <Link href={`/${book.id}`}>Оқу</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={book.fileUrl} download>
            Жүктеу
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
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
  );
};
