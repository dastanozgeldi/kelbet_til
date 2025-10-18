"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { filters } from "@/data/config";
import { createBook } from "../actions";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { UploadBook } from "./upload-book";
import { ExternalLinkIcon } from "lucide-react";

const initialState = {
  message: "",
};

export function CreateBookForm() {
  const [state, formAction, pending] = useActionState(createBook, initialState);
  const [fileUrl, setFileUrl] = useState("");

  const handlePreview = async () => {
    if (!fileUrl) return;

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: fileUrl }),
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
      <div className="space-y-1.5">
        <Label htmlFor="title">Кітап атауы</Label>
        <Input id="title" name="title" placeholder="Абай жолы" required />
      </div>

      <div className="space-y-1.5">
        <UploadBook onFileUploaded={setFileUrl} />
        {fileUrl && (
          <div className="my-3 flex items-center space-x-3">
            <Button type="button" variant="outline" onClick={handlePreview}>
              Көру
              <ExternalLinkIcon className="size-4" />
            </Button>
            <span className="text-muted-foreground text-sm">Файл жүктелді</span>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="grade">Сынып</Label>
        <select
          id="grade"
          name="grade"
          className="w-full rounded-md border bg-transparent px-3 py-2"
          defaultValue={filters.grades[0]}
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
          defaultValue={filters.languages[0]}
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
          defaultValue={filters.terms[0]}
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
