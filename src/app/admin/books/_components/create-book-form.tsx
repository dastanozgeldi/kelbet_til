"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { filters } from "@/config";
import { createBook } from "../actions";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { UploadBook } from "./upload-book";
import { ExternalLinkIcon } from "lucide-react";
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

export function CreateBookForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, pending] = useActionState(createBook, initialState);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSuccess?.();
    } else if (state?.message && !state?.success) {
      toast.error(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handlePreview = async () => {
    if (!fileUrl) return;

    try {
      const signedUrl = await fetchBookSignedUrl(fileUrl);
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error getting preview URL:", error);
      alert("Файлды көрсету кезінде қате пайда болды");
    }
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="fileUrl" value={fileUrl} />

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

      <div className="flex flex-wrap gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="program">Бағдарлама</Label>
          <Select name="program" defaultValue={filters.programs[0]}>
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
          <Select name="grade" defaultValue={filters.grades[0]}>
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
          <Select name="language" defaultValue={filters.languages[0]}>
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
          <Select name="term" defaultValue={filters.terms[0]}>
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

      <Button disabled={pending || !fileUrl}>Сақтау</Button>
    </form>
  );
}
