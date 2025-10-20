"use client";

import { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UploadJournalProps {
  onFileUploaded?: (fileUrl: string) => void;
}

export const UploadJournal = ({ onFileUploaded }: UploadJournalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const uploadFileWithProgress = (
    file: File,
    signedUrl: string,
    signal: AbortSignal,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", signedUrl);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        console.log("XHR status:", xhr.status);
        console.log("XHR response:", xhr.responseText);
        if (xhr.status === 200 || xhr.status === 204) {
          resolve();
        } else {
          reject(
            new Error(
              `Upload failed with status ${xhr.status}: ${xhr.responseText}`,
            ),
          );
        }
      };

      xhr.onerror = (e) => {
        console.error("XHR error event:", e);
        reject(new Error("Upload failed - network error"));
      };

      xhr.send(file);

      signal.addEventListener("abort", () => {
        xhr.abort();
        reject(new Error("Upload cancelled"));
      });
    });
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setFileUrl("");
    abortControllerRef.current = new AbortController();

    try {
      // Step 1: Get signed URL from API
      console.log("Requesting signed URL for:", file.name, file.type);
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to get signed URL");
      }

      const { signedUrl } = responseData;

      // Step 2: Upload file to signed URL with progress tracking
      console.log("Starting upload to signed URL...");
      await uploadFileWithProgress(
        file,
        signedUrl,
        abortControllerRef.current.signal,
      );

      console.log("Upload successful!");

      // Step 3: Store the file name (key) as the fileUrl
      const uploadedFileUrl = file.name;
      setFileUrl(uploadedFileUrl);
      onFileUploaded?.(uploadedFileUrl);
    } catch (error) {
      if (error instanceof Error && error.message === "Upload cancelled") {
        console.log("Upload cancelled by user");
      } else {
        console.error("Error uploading file:", error);
        alert(
          `Файлды жүктеу кезінде қате пайда болды: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
      setFileUrl("");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      abortControllerRef.current = null;
    }
  };

  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="space-y-1.5">
      <Label htmlFor="journal-file">Журнал</Label>
      <div className="flex items-center gap-3">
        <div className="grid w-full items-center gap-1.5">
          <Input
            id="journal-file"
            type="file"
            accept=".pdf"
            disabled={isUploading}
            onChange={(e) => {
              setUploadProgress(0);
              setFile(e.target.files?.[0] || null);
            }}
          />
        </div>

        <Button
          type="button"
          disabled={!file || isUploading}
          onClick={handleUpload}
        >
          {isUploading ? "Жүктелуде..." : "Жүктеу"}
        </Button>
      </div>

      {/* Hidden input to include fileUrl in form data */}
      <input type="hidden" name="fileUrl" value={fileUrl} />

      {/* Upload Progress */}
      {isUploading && (
        <div className="my-3 space-y-2">
          <Progress value={uploadProgress} />
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {uploadProgress.toFixed(0)}% жүктелді
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancelUpload}
              className="text-destructive hover:text-destructive"
            >
              Болдырмау
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
