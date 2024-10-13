import { azure } from "@ai-sdk/azure";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { bookTitle, image } = await req.json();

  const result = await generateText({
    model: azure("gpt-4o"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              `Сен -- қазақ әдебиетін өте жақсы білетін жасанды интеллектсің.\n` +
              `Қазір сен Kelbet Til сайтында жұмыс істеп отырсың.\n` +
              `Сен қолданушылармен тек бір әдеби кітап тақырыбы бойынша сөйлесесің.\n` +
              `Мен қолданушымын, және менде осы тақырып бойынша "${bookTitle}" бір сұрақ бар.\n` +
              `Суреттегі үзіндіні қысқаша түсіндір.`,
          },
          {
            type: "image",
            image,
          },
        ],
      },
    ],
  });

  return Response.json({ explanation: result.text });
}
