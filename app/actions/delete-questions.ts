"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteQuestion(id: number) {
  try {
    await db.$transaction(async (prisma) => {
      // Delete all associated answers first
      await prisma.answer.deleteMany({
        where: {
          questionId: id,
        },
      });

      // Then delete the question
      await prisma.question.delete({
        where: {
          id,
        },
      });
    });

    revalidatePath("/create-questions");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete question:", error);
    return { success: false, error: "Failed to delete question" };
  }
}
