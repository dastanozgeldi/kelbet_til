import { BotIcon } from "lucide-react";
import type { Book } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Chat, ChatSkeleton } from "./chat";
import { Suspense } from "react";
import { db } from "@/server/db";
import { auth, signIn } from "@/server/auth";

export async function ChatDialog({ book }: { book: Book }) {
  return (
    <Dialog>
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
        <Suspense fallback={<ChatSkeleton />}>
          <SuspenseBoundary book={book} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}

async function SuspenseBoundary({ book }: { book: Book }) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId)
    return (
      <div className="space-y-3">
        <p>Жасанды интеллектті қолдану үшін аккаунтқа кіріңіз.</p>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button type="submit">Кіру</Button>
        </form>
      </div>
    );

  const messages = await db.message.findMany({
    where: { userId, bookId: book.id },
  });

  return (
    <Chat
      book={book}
      initialMessages={messages.map((message) => ({
        id: message.id,
        content: message.content,
        role: message.isAI ? "assistant" : "user",
      }))}
    />
  );
}
