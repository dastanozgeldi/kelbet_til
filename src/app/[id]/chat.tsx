"use client";
import { Book } from "@prisma/client";
import { type Message, useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "next-auth";
import { useEffect, useRef } from "react";

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
            data: {
              userId: user.id,
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
        <Button disabled={isLoading}>сұрау</Button>
      </form>
    </div>
  );
}
