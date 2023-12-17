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
  answers: z.array(
    z.object({
      content: z.string(),
      isCorrect: z.boolean(),
    })
  ),
});
