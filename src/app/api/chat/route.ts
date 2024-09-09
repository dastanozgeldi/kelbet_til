import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { bookTitle, messages } = await req.json();

  const prompt = {
    role: "system",
    content:
      `Сен -- қазақ әдебиетін өте жақсы білетін жасанды интеллектсің.\n` +
      `Қазір сен Kelbet Til сайтында жұмыс істеп отырсың.\n` +
      `Қолданушылар саған әдеби шығармалар бойынша сұрақ қояды.\n` +
      `Сен қолданушымен тек бір тақырыпта сөйлесесің.\n` +
      `Мысалы, сен "Ақбілек" романына енгізілген жасанды интеллектсің.\n` +
      `Тек "Ақбілек" романы бойынша сұраққа жауап бересің.\n` +
      `Тақырыптан тыс сұрақтарға "Мен әдеби чатботпын, әдебиеттен тыс сұрақтарға жауап бере алмаймын" деп жауап бересің` +
      `Шығарманың тақырыбы: ${bookTitle}`,
  };

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: convertToCoreMessages([prompt, ...messages]),
  });

  return result.toDataStreamResponse();
}
