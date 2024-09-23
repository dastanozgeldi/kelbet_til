"use client";
import { Book } from "@prisma/client";
import { useChat } from "ai/react";
import { generateSystemPrompt } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Chat({ book }: { book: Book }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

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
      </div>
      <form
        className="sticky bottom-0 flex items-center gap-3 bg-white"
        onSubmit={(e) =>
          handleSubmit(e, {
            data: { systemPrompt: generateSystemPrompt(book) },
          })
        }
      >
        <Input
          value={input}
          placeholder="Сұрақ қойыңыз..."
          onChange={handleInputChange}
        />
        <Button>сұрау</Button>
      </form>
    </div>
  );
}
