"use client";

import { Book } from "@prisma/client";
import { UIMessage, useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  SendIcon,
  SendHorizonalIcon,
  SquareIcon,
  Loader2Icon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";

export function Chat({
  book,
  initialMessages,
}: {
  book: Book;
  initialMessages: UIMessage[];
}) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop } = useChat({
    messages: initialMessages,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
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
    }
  };

  return (
    <div className="flex h-[500px] flex-col space-y-3">
      <Conversation>
        <ConversationContent className="p-0">
          {messages.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent>
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Response key={`${message.id}-${i}`}>
                          {part.text}
                        </Response>
                      );
                    default:
                      return null;
                  }
                })}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
      </Conversation>

      <form
        className="flex items-center gap-2 bg-white"
        onSubmit={handleSubmit}
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
            disabled={input.trim() === "" || status !== "ready"}
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
