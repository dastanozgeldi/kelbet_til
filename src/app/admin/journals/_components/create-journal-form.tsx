"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createJournal } from "../actions";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { UploadJournal } from "./upload-journal";
import { ExternalLinkIcon } from "lucide-react";

const initialState = {
  message: "",
};

export function CreateJournalForm() {
  const [state, formAction, pending] = useActionState(
    createJournal,
    initialState,
  );
  const [fileUrl, setFileUrl] = useState("");

  const handlePreview = async () => {
    if (!fileUrl) return;

    try {
      const response = await fetch("/api/files/journals", {
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
        <Label htmlFor="title">Журнал атауы</Label>
        <Input id="title" name="title" placeholder="Абай жолы" required />
      </div>

      <div className="space-y-1.5">
        <UploadJournal onFileUploaded={setFileUrl} />
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

      <p aria-live="polite">{state?.message}</p>
      <Button disabled={pending}>Сақтау</Button>
    </form>
  );
}
