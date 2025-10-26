"use server";

import { generateUniqueSlug } from "@/lib/slugify";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { ArticleStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";

const createArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  status: z.string(),
});

export async function createArticle(initialState: any, formData: FormData) {
  const validatedFields = createArticleSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }

  const { title, description, content, status } = validatedFields.data;

  const session = await auth();
  const slug = await generateUniqueSlug(title);

  try {
    await db.article.create({
      data: {
        title,
        slug,
        description,
        content,
        status: status as ArticleStatus,
        userId: session?.user.id,
      },
    });
    revalidatePath("/admin/articles");
    return {
      success: true,
      message: "Мақала сәтті қосылды",
    };
  } catch (error) {
    console.error("Error creating article:", error);
    return {
      success: false,
      message: "Мақала қосуда ақаулық туындады",
    };
  }
}

const editArticleSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  status: z.string().optional(),
});

export async function editArticle(initialState: any, formData: FormData) {
  const validatedFields = editArticleSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }

  const { id, title, description, content, status } = validatedFields.data;

  try {
    await db.article.update({
      where: { id },
      data: {
        title,
        description,
        content,
        status: status as ArticleStatus,
      },
    });

    revalidatePath("/admin/articles");
    return {
      success: true,
      message: "Мақала сәтті өзгертілді",
    };
  } catch (error) {
    console.error("Error editing article:", error);
    return {
      success: false,
      message: "Мақала өзгертуде ақаулық туындады",
    };
  }
}

export async function deleteArticle(id: string) {
  try {
    await db.article.delete({ where: { id } });

    revalidatePath("/admin/articles");

    return {
      success: true,
      message: "Мақала сәтті жойылды",
    };
  } catch (error) {
    console.error("Error deleting article:", error);
    return {
      success: false,
      message: "Мақала жоюда ақаулық туындады",
    };
  }
}
