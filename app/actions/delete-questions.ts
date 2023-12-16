"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteQuestion(id: number) {
  await db.question.delete({
    where: {
      id,
    },
  });

  revalidatePath("/create-questions");
}
