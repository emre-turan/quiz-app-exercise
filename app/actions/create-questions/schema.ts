import { z } from "zod";

export const CreateQuestion = z.object({
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content is required",
    })
    .min(3, {
      message: "Question is too short",
    }),
});

export const CreateAnswer = z.object({
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content is required",
    })
    .min(3, {
      message: "Answer is too short",
    }),
  isCorrect: z.boolean(),
});
