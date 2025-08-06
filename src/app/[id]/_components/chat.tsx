"use client";

import { Book } from "@prisma/client";
import { type Message, useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { cn, renderMarkdown } from "@/lib/utils";
import { SendIcon } from "lucide-react";

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
        {messages.map((m) => (
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
        ))}
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
