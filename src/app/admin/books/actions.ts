"use server";

import { db } from "@/server/db";
import type { Language } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  fileUrl: z.string(),
  grade: z.string(),
  language: z.string(),
  term: z.string(),
});

export async function createBook(initialState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    title: formData.get("title"),
    fileUrl: formData.get("fileUrl"),
    grade: formData.get("grade"),
    language: formData.get("language"),
    term: formData.get("term"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().formErrors.join(", "),
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
