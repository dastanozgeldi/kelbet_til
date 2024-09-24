"use client";
import { Book } from "@prisma/client";
import { type Message, useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "next-auth";
import { useEffect, useRef, useState } from "react";

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
        {messages.map((m) =>
          m.role === "user" ? (
            <div
              key={m.id}
              className="ml-auto max-w-max whitespace-pre-wrap rounded-lg bg-[#6C63FF] p-3 text-right text-white"
            >
              {m.content}
            </div>
          ) : (
            <div
              key={m.id}
              className="max-w-max whitespace-pre-wrap rounded-lg bg-gray-300 p-3"
            >
              {m.content}
            </div>
          ),
        )}
        <div ref={messagesEndRef} />
      </div>
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

      {!(status.remaining > 0) && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Хабарлама шегіне жеттіңіз, сәлден соң қайтып келіңіз.
        </div>
      )}
    </div>
  );
}
