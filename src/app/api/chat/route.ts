import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { azure } from "@ai-sdk/azure";
import { streamText, convertToModelMessages, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) throw new Error("User not found");

  const {
    messages,
    bookId,
    bookTitle,
  }: {
    messages: UIMessage[];
    bookId: string;
    bookTitle: string;
  } = await req.json();

  const result = streamText({
    model: azure("gpt-4o"),
    messages: convertToModelMessages([
      {
        role: "system",
        parts: [
          {
            type: "text",
            text:
              `Сен -- қазақ әдебиетін өте жақсы білетін жасанды интеллектсің.\n` +
              `Қазір сен Kelbet Til сайтында жұмыс істеп отырсың.\n` +
              `Қолданушылар саған әдеби шығармалар бойынша сұрақ қояды.\n` +
              `Сен қолданушымен тек бір тақырыпта сөйлесесің.\n` +
              `Мысалы, сен "Ақбілек" романына енгізілген жасанды интеллектсің.\n` +
              `Тек "Ақбілек" романы бойынша сұраққа жауап бересің.\n` +
              `Тақырыптан тыс сұрақтарға "Мен әдеби чатботпын, әдебиеттен тыс сұрақтарға жауап бере алмаймын" деп жауап бересің.\n` +
              `Шығарманың тақырыбы: ${bookTitle}`,
          },
        ],
      },
      ...messages,
    ]),
    onFinish: async ({ text }) => {
      const lastUserMessage = messages[messages.length - 1].parts[0];

      await db.message.createMany({
        data: [
          {
            content:
              lastUserMessage.type === "text" ? lastUserMessage.text : "",
            userId,
            bookId,
          },
          {
            content: text,
            isAI: true,
            userId,
            bookId,
          },
        ],
      });
    },
  });

  return result.toUIMessageStreamResponse();
}
