"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState } from "react";
import { editJournal } from "../actions";
import type { Journal } from "@prisma/client";
import { UploadJournal } from "./upload-journal";
import { ExternalLinkIcon, FileTextIcon } from "lucide-react";
import { fetchJournalSignedUrl } from "@/helpers/fetch-journal-signed-url";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
};

export function EditJournalForm({
  journal,
  onSuccess,
}: {
  journal: Journal;
  onSuccess?: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    editJournal,
    initialState,
  );
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
    if (!journal.fileUrl) return;

    try {
      const signedUrl = await fetchJournalSignedUrl(journal.fileUrl);
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error getting preview URL:", error);
      alert("Файлды көрсету кезінде қате пайда болды");
    }
  };

  const handlePreviewNewFile = async () => {
    if (!newFileUrl) return;

    try {
      const signedUrl = await fetchJournalSignedUrl(newFileUrl);
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error getting preview URL:", error);
      alert("Файлды көрсету кезінде қате пайда болды");
    }
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={journal.id} />
      <input
        type="hidden"
        name="fileUrl"
        value={newFileUrl || journal.fileUrl}
      />

      <div className="space-y-1.5">
        <Label htmlFor="title">Журнал атауы</Label>
        <Input
          id="title"
          name="title"
          defaultValue={journal.title}
          placeholder="Абай жолы"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="status">Статус</Label>
        <Select name="status" defaultValue={journal.status}>
          <SelectTrigger>
            <SelectValue placeholder="Статусты таңдаңыз" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PUBLISHED">Публикация</SelectItem>
            <SelectItem value="DRAFT">Черновик</SelectItem>
            <SelectItem value="ARCHIVED">Архив</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Ағымдағы файл</Label>
        <div className="bg-muted/50 flex items-center gap-3 rounded-md border p-3">
          <FileTextIcon className="text-muted-foreground size-5" />
          <span className="w-[200px] flex-1 truncate text-sm">
            {journal.fileUrl.split("/").pop()}
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
        <UploadJournal onFileUploaded={setNewFileUrl} />
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

      <Button disabled={pending}>Сақтау</Button>
    </form>
  );
}
