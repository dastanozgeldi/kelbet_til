"use client";

import { Book } from "@prisma/client";
import { UIMessage, useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { cn, renderMarkdown } from "@/lib/utils";
import {
  SendIcon,
  MessageCircleIcon,
  SendHorizonalIcon,
  SquareIcon,
  Loader2Icon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  book: Book;
  initialMessages: UIMessage[];
}

export function Chat({ book, initialMessages }: Props) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop } = useChat({
    messages: initialMessages,
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
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="flex items-center gap-2 bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(
            { text: input },
            {
              body: {
                bookId: book.id,
                bookTitle: book.title,
              },
            },
          );
          setInput("");
        }}
      >
        <Input
          value={input}
          placeholder="Сұрақ қойыңыз..."
          onChange={(e) => setInput(e.target.value)}
        />
        {status === "submitted" || status === "streaming" ? (
          <Button
            type="button"
            size="icon"
            onClick={() => stop()}
            disabled={status === "submitted"}
          >
            {status === "submitted" ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <SquareIcon className="size-4" />
            )}
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={input === "" || status !== "ready"}
          >
            <SendHorizonalIcon />
          </Button>
        )}
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

function MessageBubble({ message }: { message: UIMessage }) {
  return (
    <div
      className={cn(
        "max-w-max rounded-lg p-3 whitespace-pre-wrap",
        message.role === "user"
          ? "bg-primary ml-auto text-right text-white"
          : "bg-gray-300",
      )}
    >
      {message.parts.map((part, i) => {
        switch (part.type) {
          case "text":
            return (
              <div
                key={`${message.id}-${i}`}
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(part.text),
                }}
              />
            );
        }
      })}
    </div>
  );
}
