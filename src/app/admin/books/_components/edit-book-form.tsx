"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { filters } from "@/data/config";
import { useActionState } from "react";
import { editBook } from "../actions";
import type { Book } from "@prisma/client";
import { UploadBook } from "./upload-book";
import { ExternalLinkIcon, FileTextIcon } from "lucide-react";

const initialState = {
  message: "",
};

export function EditBookForm({ book }: { book: Book }) {
  const [state, formAction, pending] = useActionState(editBook, initialState);
  const [newFileUrl, setNewFileUrl] = useState("");

  const handlePreviewCurrentFile = async () => {
    if (!book.fileUrl) return;

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: book.fileUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to get preview URL");
      }

      const { signedUrl } = await response.json();
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error getting preview URL:", error);
      alert("Файлды көрсету кезінде қате пайда болды");
    }
  };

  const handlePreviewNewFile = async () => {
    if (!newFileUrl) return;

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: newFileUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to get preview URL");
      }

      const { signedUrl } = await response.json();
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error getting preview URL:", error);
      alert("Файлды көрсету кезінде қате пайда болды");
    }
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={book.id} />

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

      <div className="space-y-1.5">
        <Label htmlFor="grade">Сынып</Label>
        <select
          id="grade"
          name="grade"
          className="w-full rounded-md border bg-transparent px-3 py-2"
          defaultValue={book.grade}
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
          name="language"
          className="w-full rounded-md border bg-transparent px-3 py-2"
          defaultValue={book.language}
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
          name="term"
          className="w-full rounded-md border bg-transparent px-3 py-2"
          defaultValue={book.term}
        >
          {filters.terms.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>
      </div>

      <p aria-live="polite">{state?.message}</p>
      <Button disabled={pending}>Сақтау</Button>
    </form>
  );
}
