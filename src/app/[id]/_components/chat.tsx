"use client";

import { Book } from "@prisma/client";
import { type Message, useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { cn, renderMarkdown } from "@/lib/utils";
import { SendIcon, MessageCircleIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  book: Book;
  initialMessages: Message[];
}

export function Chat({ book, initialMessages }: Props) {
  const { messages, input, isLoading, handleInputChange, handleSubmit } =
    useChat({
      initialMessages,
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-[400px] flex-col">
      <div className="mb-4 flex-1 space-y-3 overflow-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MessageCircleIcon className="mb-4 size-12" />
            <h3 className="text-lg font-medium">Сұрақ қоя бастаңыз</h3>
            <p className="text-muted-foreground text-sm">
              Жасанды интеллект сізге кітап мазмұны бойынша жауап береді.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "max-w-max rounded-lg p-3 whitespace-pre-wrap",
                m.role === "user"
                  ? "bg-primary ml-auto text-right text-white"
                  : "bg-gray-300",
              )}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="flex items-center gap-3 bg-white"
        onSubmit={(e) =>
          handleSubmit(e, {
            data: {
              bookId: book.id,
              bookTitle: book.title,
            },
          })
        }
      >
        <Input
          value={input}
          placeholder="Сұрақ қойыңыз..."
          onChange={handleInputChange}
        />
        <Button disabled={isLoading}>
          <SendIcon className="size-4" />
          Сұрау
        </Button>
      </form>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex h-[400px] flex-col">
      <div className="mb-4 flex-1 space-y-3 overflow-auto">
        {/* User message skeleton */}
        <div className="bg-primary ml-auto max-w-max rounded-lg p-3">
          <Skeleton className="bg-primary-foreground/20 h-4 w-32" />
        </div>

        {/* AI message skeleton */}
        <div className="max-w-max rounded-lg bg-gray-300 p-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 bg-gray-400/40" />
            <Skeleton className="h-4 w-36 bg-gray-400/40" />
            <Skeleton className="h-4 w-24 bg-gray-400/40" />
          </div>
        </div>

        {/* Another user message skeleton */}
        <div className="bg-primary ml-auto max-w-max rounded-lg p-3">
          <Skeleton className="bg-primary-foreground/20 h-4 w-28" />
        </div>

        {/* Another AI message skeleton */}
        <div className="max-w-max rounded-lg bg-gray-300 p-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40 bg-gray-400/40" />
            <Skeleton className="h-4 w-44 bg-gray-400/40" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white">
        <Input
          placeholder="Сұрақ қойыңыз..."
          disabled
          className="cursor-not-allowed"
        />
        <Button disabled>
          <SendIcon className="size-4" />
          Сұрау
        </Button>
      </div>
    </div>
  );
}
