import type { BookStatus, UserRole } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { marked } from "marked";

export const renderMarkdown = (text: string) => {
  return marked(text, {
    gfm: true, // GitHub flavored markdown
    breaks: true, // Convert line breaks to <br>
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSystemPrompt(bookTitle: string) {
  return {
    role: "system",
    content:
      `Сен -- қазақ әдебиетін өте жақсы білетін жасанды интеллектсің.\n` +
      `Қазір сен Kelbet Til сайтында жұмыс істеп отырсың.\n` +
      `Қолданушылар саған әдеби шығармалар бойынша сұрақ қояды.\n` +
      `Сен қолданушымен тек бір тақырыпта сөйлесесің.\n` +
      `Мысалы, сен "Ақбілек" романына енгізілген жасанды интеллектсің.\n` +
      `Тек "Ақбілек" романы бойынша сұраққа жауап бересің.\n` +
      `Тақырыптан тыс сұрақтарға "Мен әдеби чатботпын, әдебиеттен тыс сұрақтарға жауап бере алмаймын" деп жауап бересің.\n` +
      `Шығарманың тақырыбы: ${bookTitle}`,
  };
}

export function isAdmin(role: UserRole) {
  return role === "ADMIN";
}

export function isActive(status: BookStatus) {
  return status === "ACTIVE";
}

export function isValidRectangle({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return width >= 5 && height >= 5;
}
