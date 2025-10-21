"use server";

import { db } from "@/server/db";
import { JournalStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createJournalSchema = z.object({
  userId: z.string(),
  title: z.string(),
  fileUrl: z.string(),
});

export async function createJournal(initialState: any, formData: FormData) {
  const validatedFields = createJournalSchema.safeParse({
    userId: formData.get("userId"),
    title: formData.get("title"),
    fileUrl: formData.get("fileUrl"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }

  const { userId, title, fileUrl } = validatedFields.data;

  try {
    await db.journal.create({
      data: {
        userId,
        title,
        fileUrl,
      },
    });

    revalidatePath("/admin/journals");
    return {
      success: true,
      message: "Журнал сәтті қосылды",
    };
  } catch (error) {
    console.error("Error creating journal:", error);
    return {
      success: false,
      message: "Журнал қосуда ақаулық туындады",
    };
  }
}

const editJournalSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  fileUrl: z.string().optional(),
  status: z.enum(JournalStatus).optional(),
});

export async function editJournal(initialState: any, formData: FormData) {
  const validatedFields = editJournalSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    fileUrl: formData.get("fileUrl"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      message: JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }

  const { id, title, fileUrl, status } = validatedFields.data;

  await db.journal.update({
    where: { id },
    data: {
      title,
      fileUrl,
      status,
    },
  });

  revalidatePath("/admin/journals");
}

export async function deleteJournal(journalId: string) {
  try {
    await db.journal.delete({
      where: { id: journalId },
    });

    revalidatePath("/admin/journals");
    return { success: true, message: "Журнал сәтті жойылды" };
  } catch (error) {
    console.error("Error deleting journal:", error);
    return { success: false, message: "Журнал жоюда ақаулық туындады" };
  }
}
