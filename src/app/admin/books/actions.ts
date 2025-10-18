"use server";

import { db } from "@/server/db";
import type { Language } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createBookSchema = z.object({
  title: z.string(),
  fileUrl: z.string(),
  grade: z.string(),
  language: z.string(),
  term: z.string(),
});

export async function createBook(initialState: any, formData: FormData) {
  const validatedFields = createBookSchema.safeParse({
    title: formData.get("title"),
    fileUrl: formData.get("fileUrl"),
    grade: formData.get("grade"),
    language: formData.get("language"),
    term: formData.get("term"),
  });

  if (!validatedFields.success) {
    return {
      message: JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }

  const { title, fileUrl, grade, language, term } = validatedFields.data;

  await db.book.create({
    data: {
      title,
      fileUrl,
      grade,
      language: language as Language,
      term,
    },
  });

  revalidatePath("/admin/books");
}

const editBookSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  fileUrl: z.string().optional(),
  grade: z.string().optional(),
  language: z.string().optional(),
  term: z.string().optional(),
});

export async function editBook(initialState: any, formData: FormData) {
  const validatedFields = editBookSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    fileUrl: formData.get("fileUrl"),
    grade: formData.get("grade"),
    language: formData.get("language"),
    term: formData.get("term"),
  });

  if (!validatedFields.success) {
    return {
      message: JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }

  const { id, title, fileUrl, grade, language, term } = validatedFields.data;

  await db.book.update({
    where: { id },
    data: {
      title,
      fileUrl,
      grade,
      language: language as Language,
      term,
    },
  });

  revalidatePath("/admin/books");
}

export async function deleteBook(bookId: string) {
  try {
    await db.book.delete({
      where: { id: bookId },
    });

    revalidatePath("/admin/books");
    return { success: true, message: "Шығарма сәтті жойылды" };
  } catch (error) {
    console.error("Error deleting book:", error);
    return { success: false, message: "Шығарма жоюда ақаулық туындады" };
  }
}
