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

interface Props {
  book: Book;
  // user: User;
  history: Message[];
  loadHistory: () => void;
}

export const ChatDialog = ({
  book,
  // user,
  history,
  loadHistory,
}: Props) => {
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
