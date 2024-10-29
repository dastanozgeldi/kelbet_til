import type { User } from "next-auth";
import type { Book, Message } from "@prisma/client";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
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
      <DialogTrigger
        className={cn(buttonVariants(), "flex items-center gap-3")}
      >
        <Icons.ai className="h-4 w-4" />
        AI
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
