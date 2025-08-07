import type { BookStatus } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
