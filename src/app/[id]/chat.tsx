"use client";

import { useChat } from "ai/react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      <div className="mx-auto mb-16 flex h-[400px] max-w-md flex-col space-y-3 overflow-auto">
        {messages.map((m) =>
          m.role === "user" ? (
            <div
              key={m.id}
              className="ml-auto max-w-max whitespace-pre-wrap rounded-lg bg-blue-600 p-3 text-right text-white"
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

        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
            value={input}
            placeholder="Сұрақ қойыңыз..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
