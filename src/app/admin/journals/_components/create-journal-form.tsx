"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createJournal } from "../actions";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { UploadJournal } from "./upload-journal";
import { ExternalLinkIcon } from "lucide-react";
import { fetchJournalSignedUrl } from "@/helpers/fetch-journal-signed-url";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
};

export function CreateJournalForm({
  userId,
  onSuccess,
}: {
  userId: string;
  onSuccess?: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    createJournal,
    initialState,
  );
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
      const signedUrl = await fetchJournalSignedUrl(fileUrl);
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error getting preview URL:", error);
      alert("Файлды көрсету кезінде қате пайда болды");
    }
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="fileUrl" value={fileUrl} />

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

      <Button disabled={pending || !fileUrl}>Сақтау</Button>
    </form>
  );
}
