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
import { type Book } from "@prisma/client";
import Link from "next/link";
import { EditBookDialog } from "./edit-book-dialog";
import { DeleteBookDialog } from "./delete-book-dialog";
import { fetchBookSignedUrl } from "@/helpers/fetch-book-signed-url";

export const BookActions = ({ book }: { book: Book }) => {
  return (
    <div className="flex items-center">
      <Button asChild variant="ghost" size="icon" className="h-8 w-8 p-0">
        <Link href={`/${book.id}`}>
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
          <EditBookDialog book={book} />
          <DropdownMenuItem
            onSelect={async () => {
              try {
                const signedUrl = await fetchBookSignedUrl(book.fileUrl);
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
          <DeleteBookDialog id={book.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
