"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { filters } from "@/config";
import { useActionState } from "react";
import { editBook } from "../actions";
import type { Book } from "@prisma/client";
import { UploadBook } from "./upload-book";
import { ExternalLinkIcon, FileTextIcon } from "lucide-react";
import { fetchBookSignedUrl } from "@/helpers/fetch-book-signed-url";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
};

export function EditBookForm({
  book,
  onSuccess,
}: {
  book: Book;
  onSuccess?: () => void;
}) {
  const [state, formAction, pending] = useActionState(editBook, initialState);
  const [newFileUrl, setNewFileUrl] = useState("");

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSuccess?.();
    } else if (state?.message && !state?.success) {
      toast.error(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handlePreviewCurrentFile = async () => {
    if (!book.fileUrl) return;

    try {
      const signedUrl = await fetchBookSignedUrl(book.fileUrl);
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error getting preview URL:", error);
      alert("Файлды көрсету кезінде қате пайда болды");
    }
  };

  const handlePreviewNewFile = async () => {
    if (!newFileUrl) return;

    try {
      const signedUrl = await fetchBookSignedUrl(newFileUrl);
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error getting preview URL:", error);
      alert("Файлды көрсету кезінде қате пайда болды");
    }
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={book.id} />
      <input type="hidden" name="fileUrl" value={newFileUrl || book.fileUrl} />

      <div className="space-y-1.5">
        <Label htmlFor="title">Кітап атауы</Label>
        <Input
          id="title"
          name="title"
          defaultValue={book.title}
          placeholder="Абай жолы"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label>Ағымдағы файл</Label>
        <div className="bg-muted/50 flex items-center gap-3 rounded-md border p-3">
          <FileTextIcon className="text-muted-foreground size-5" />
          <span className="w-[200px] flex-1 truncate text-sm">
            {book.fileUrl.split("/").pop()}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePreviewCurrentFile}
          >
            Көру
            <ExternalLinkIcon className="size-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-1.5">
        <UploadBook onFileUploaded={setNewFileUrl} />
        {newFileUrl && (
          <div className="my-3 flex items-center justify-between space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviewNewFile}
            >
              Жаңа файлды көру
              <ExternalLinkIcon className="size-4" />
            </Button>
            <span className="text-sm font-medium text-green-600">
              Сәтті жүктелді
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="program">Бағдарлама</Label>
          <Select name="program" defaultValue={book.program}>
            <SelectTrigger>
              <SelectValue placeholder="Бағдарламаны таңдаңыз" />
            </SelectTrigger>
            <SelectContent>
              {filters.programs.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="grade">Сынып</Label>
          <Select name="grade" defaultValue={book.grade}>
            <SelectTrigger>
              <SelectValue placeholder="Сыныпты таңдаңыз" />
            </SelectTrigger>
            <SelectContent>
              {filters.grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="language">Тіл</Label>
          <Select name="language" defaultValue={book.language}>
            <SelectTrigger>
              <SelectValue placeholder="Тілді таңдаңыз" />
            </SelectTrigger>
            <SelectContent>
              {filters.languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="term">Тоқсан</Label>
          <Select name="term" defaultValue={book.term}>
            <SelectTrigger>
              <SelectValue placeholder="Тоқсанды таңдаңыз" />
            </SelectTrigger>
            <SelectContent>
              {filters.terms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button disabled={pending}>Сақтау</Button>
    </form>
  );
}
