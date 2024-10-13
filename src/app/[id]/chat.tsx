"use client";
import { Book } from "@prisma/client";
import { type Message, useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { cn, renderMarkdown } from "@/lib/utils";

interface Props {
  book: Book;
  user: User;
  initialMessages: Message[];
}

export function Chat({ book, user, initialMessages }: Props) {
  const { messages, input, isLoading, handleInputChange, handleSubmit } =
    useChat({
      initialMessages,
    });

  const [status, setStatus] = useState({
    success: true,
    limit: 2,
    remaining: 2,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRatelimit = async () => {
    try {
      const response = await fetch(`/api/ratelimit/${user.id}`);
      const data = await response.text();
      setStatus(JSON.parse(data));
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatus({
        success: false,
        limit: -1,
        remaining: -1,
      });
    }
  };

  return (
    <div className="flex h-[400px] flex-col">
      <div className="mb-4 flex-1 space-y-3 overflow-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "max-w-max whitespace-pre-wrap rounded-lg p-3",
              m.role === "user"
                ? "ml-auto bg-[#6C63FF] text-right text-white"
                : "bg-gray-300",
            )}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {!(status.remaining > 0) && (
        <div className="mb-4 text-center text-sm text-muted-foreground">
          Хабарлама шегіне жеттіңіз, сәлден соң қайтып келіңіз.
        </div>
      )}

      <form
        className="sticky bottom-0 flex items-center gap-3 bg-white"
        onSubmit={(e) =>
          handleSubmit(e, {
            data: { userId: user.id, bookId: book.id, bookTitle: book.title },
          })
        }
      >
        <Input
          value={input}
          placeholder="Сұрақ қойыңыз..."
          onChange={handleInputChange}
        />
        <Button
          disabled={isLoading || !(status.remaining > 0)}
          onClick={handleRatelimit}
        >
          сұрау
        </Button>
      </form>
    </div>
  );
}
