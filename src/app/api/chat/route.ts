import { generateSystemPrompt } from "@/lib/utils";
import { db } from "@/server/db";
import { azure } from "@ai-sdk/azure";
import { streamText, convertToCoreMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { data, messages } = await req.json();
  const { userId, bookId, bookTitle } = data;

  const lastUserMessage = messages[messages.length - 1];

  await db.message.create({
    data: {
      content: lastUserMessage.content,
      userId,
      bookId,
    },
  });

  const result = await streamText({
    model: azure("gpt-4o"),
    messages: convertToCoreMessages([
      generateSystemPrompt(bookTitle),
      ...messages,
    ]),
    onFinish: async ({ text }) => {
      await db.message.create({
        data: {
          content: text,
          isAI: true,
          userId,
          bookId,
        },
      });
    },
  });

  return result.toDataStreamResponse();
}
