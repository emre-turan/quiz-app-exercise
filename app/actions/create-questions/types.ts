import { z } from "zod";
import { Question } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateQuestion } from "./schema";

export type InputType = z.infer<typeof CreateQuestion>;
export type AnswerInputType = z.infer<typeof CreateQuestion>["answers"][0];
export type ReturnType = ActionState<InputType, Question>;
