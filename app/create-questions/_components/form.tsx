"use client";

import { createQuestion } from "@/app/actions/create-questions";

import FormInput from "./form-input";
import FormCheckbox from "./form-checkbox";
import FormButton from "./form-submit-button";
import { useAction } from "@/hooks/use-action";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Form = () => {
  const { execute, fieldErrors } = useAction(createQuestion, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const content = formData.get("content") as string;
    const answers = [
      {
        content: formData.get("option1"),
        isCorrect: formData.get("correct-option1") === "on",
      },
      {
        content: formData.get("option2"),
        isCorrect: formData.get("correct-option2") === "on",
      },
      {
        content: formData.get("option3"),
        isCorrect: formData.get("correct-option3") === "on",
      },
      {
        content: formData.get("option4"),
        isCorrect: formData.get("correct-option4") === "on",
      },
    ];

    execute({ content, answers });
  };

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Submit a Question</CardTitle>
        <CardDescription>
          Enter your question and the four possible answers below. Mark the
          correct answer(s).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={onSubmit}>
          <div className="space-y-2">
            <FormInput
              errors={fieldErrors}
              name="content"
              label="Question"
              placeholder="Enter a question"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center">
              <Label>Answers</Label>
              <Label>Correct Answers</Label>
            </div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <FormInput
                  name={`option${index + 1}`}
                  placeholder={`Option ${index + 1}`}
                  errors={fieldErrors}
                  className="w-60"
                />
                <FormCheckbox
                  id={`correct-option${index + 1}`}
                  name={`correct-option${index + 1}`}
                />
              </div>
            ))}
          </div>
          <FormButton />
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
