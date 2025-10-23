/**
 * PDF Cache Manager Component
 * 
 * This component provides a UI for managing the PDF cache.
 * You can add this to your admin panel or user settings.
 * 
 * Usage:
 * import { PDFCacheManager } from "@/components/pdf-cache-manager";
 * 
 * <PDFCacheManager />
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePDFCacheManager } from "@/hooks/use-pdf-cache-manager";
import { HardDriveIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export function PDFCacheManager() {
  const {
    cacheSizeFormatted,
    loading,
    refreshCacheSize,
    clearCache,
  } = usePDFCacheManager();

  const handleClearCache = async () => {
    const success = await clearCache();
    if (success) {
      toast.success("PDF кэші тазартылды");
    } else {
      toast.error("Кэшті тазарту кезінде қате пайда болды");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDriveIcon className="size-5" />
          PDF Кэші
        </CardTitle>
        <CardDescription>
          PDF файлдарын браузерде сақтау арқылы жүктеу жылдамдығын арттырады
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Кэш мөлшері</p>
            <p className="text-2xl font-bold text-muted-foreground">
              {cacheSizeFormatted}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={refreshCacheSize}
            disabled={loading}
          >
            <RefreshCwIcon className={loading ? "animate-spin" : ""} />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleClearCache}
            disabled={loading}
            className="w-full"
          >
            <Trash2Icon className="mr-2 size-4" />
            Кэшті тазарту
          </Button>
        </div>

        <div className="rounded-lg bg-muted p-3 text-sm">
          <p className="font-medium">Кэш қалай жұмыс істейді?</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
            <li>PDF файлдары бірінші рет ашылғанда кэшке сақталады</li>
            <li>Бетті жаңартқан кезде қайта жүктелмейді</li>
            <li>Кэш автоматты түрде 24 сағаттан кейін тазартылады</li>
            <li>Үлкен файлдар (50MB+) үшін айтарлықтай жылдамдық өсімі</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

