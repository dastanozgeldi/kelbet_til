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
