"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

import { db } from "@/lib/db";
import { CreateQuestion } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }
  const { content } = data;

  let question;

  try {
    question = await db.question.create({
      data: {
        content,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath("/create-questions");
  return { data: question };
};

export const createQuestion = createSafeAction(CreateQuestion, handler);
