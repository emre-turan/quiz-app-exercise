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

  const { content, answers } = data;

  try {
    const question = await db.$transaction(async (prisma) => {
      const newQuestion = await prisma.question.create({
        data: {
          content,
        },
      });

      const answerPromises = answers.map((answer) =>
        prisma.answer.create({
          data: {
            content: answer.content,
            isCorrect: answer.isCorrect,
            questionId: newQuestion.id,
          },
        }),
      );

      await Promise.all(answerPromises);

      return newQuestion;
    });

    revalidatePath("/create-questions");
    return { data: question };
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }
};

export const createQuestion = createSafeAction(CreateQuestion, handler);
