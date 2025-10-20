"use client";

import { EyeIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Journal } from "@prisma/client";
import Link from "next/link";
import { EditJournalDialog } from "./edit-journal-dialog";
import { DeleteJournalDialog } from "./delete-journal-dialog";
import { fetchJournalSignedUrl } from "@/helpers/fetch-journal-signed-url";

export const JournalActions = ({ journal }: { journal: Journal }) => {
  return (
    <div className="flex items-center">
      <Button asChild variant="ghost" size="icon" className="h-8 w-8 p-0">
        <Link href={`/journals/${journal.id}`}>
          <EyeIcon />
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <EditJournalDialog journal={journal} />
          <DropdownMenuItem
            onSelect={async () => {
              try {
                const signedUrl = await fetchJournalSignedUrl(journal.fileUrl);
                window.open(signedUrl, "_blank");
              } catch (error) {
                console.error("Error downloading file:", error);
                alert("Файлды жүктеу кезінде қате пайда болды");
              }
            }}
          >
            Жүктеу
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DeleteJournalDialog id={journal.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
