"use client";

import { useRef } from "react";
import { createQuestion } from "@/app/actions/create-questions";
import { toast } from "sonner";

import FormInput from "./form-input";
import FormCheckbox from "../../../components/form/form-checkbox";
import { useAction } from "@/hooks/use-action";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";

const Form = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { execute, fieldErrors } = useAction(createQuestion, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS");
      if (formRef.current) {
        formRef.current.reset();
      }
      toast.success("Question created successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong!");
    },
  });

  const onSubmit = (formData: FormData) => {
    const content = formData.get("content") as string;
    const answers = [
      {
        content: (formData.get("option1") as string) || "",
        isCorrect: formData.get("correct-option1") === "on",
      },
      {
        content: (formData.get("option2") as string) || "",
        isCorrect: formData.get("correct-option2") === "on",
      },
      {
        content: (formData.get("option3") as string) || "",
        isCorrect: formData.get("correct-option3") === "on",
      },
      {
        content: (formData.get("option4") as string) || "",
        isCorrect: formData.get("correct-option4") === "on",
      },
    ];

    execute({ content, answers });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Submit a Question</CardTitle>
        <CardDescription>
          Enter your question and the four possible answers below. Mark the
          correct answer(s).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={onSubmit} ref={formRef}>
          <div className="space-y-2">
            <FormTextarea
              id="content"
              label="Question"
              placeholder="Enter a question"
              errors={fieldErrors}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="answers">Answers</Label>
              <Label htmlFor="correct answers">Correct Answers</Label>
            </div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <FormInput
                  name={`option${index + 1}`}
                  placeholder={`Option ${index + 1}`}
                  errors={fieldErrors}
                  className="w-96"
                />
                <FormCheckbox
                  id={`correct-option${index + 1}`}
                  name={`correct-option${index + 1}`}
                />
              </div>
            ))}
          </div>
          <FormSubmit className="w-full">Submit Question</FormSubmit>
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
