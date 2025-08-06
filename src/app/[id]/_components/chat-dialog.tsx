"use client";

import { BotIcon } from "lucide-react";
import type { Book, Message } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Chat } from "./chat";
import { useCallback, useState } from "react";

interface Props {
  book: Book;
}

export const ChatDialog = ({ book }: Props) => {
  const [history, setHistory] = useState<Message[]>([]);

  const loadHistory = useCallback(async () => {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ bookId: book.id }),
    });
    const { messages } = await res.json();

    setHistory(messages);
  }, [book.id]);

  return (
    <Dialog onOpenChange={loadHistory}>
      <DialogTrigger asChild>
        <Button>
          <BotIcon className="size-4" />
          AI
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>
            Жасанды интеллект кейде шындыққа жанаспайтын жауаптар беруі мүмкін.
          </DialogDescription>
        </DialogHeader>
        <Chat
          book={book}
          // user={user}
          initialMessages={history.map((message) => ({
            id: message.id,
            content: message.content,
            role: message.isAI ? "assistant" : "user",
          }))}
        />
      </DialogContent>
    </Dialog>
  );
};
