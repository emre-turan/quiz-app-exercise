import { deleteQuestion } from "@/app/actions/delete-questions";

import { FormSubmit } from "@/components/form/form-submit";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Trash } from "lucide-react";

interface AnswerProps {
  content: string;
  isCorrect: boolean;
}

interface QuestionProps {
  id: number;
  content: string;
  answers: AnswerProps[];
}

const Question = ({ id, content, answers }: QuestionProps) => {
  const deleteQuestionWithId = deleteQuestion.bind(null, id);
  return (
    <Card className="my-4">
      {/* <CardHeader>
        <CardTitle>Questions</CardTitle>
        <CardDescription>
          You can see the answer and questions saved on the database
        </CardDescription>
      </CardHeader> */}
      <CardContent>
        <form action={deleteQuestionWithId}>
          <div className="flex items-center justify-between ">
            <div className="my-4 flex flex-col gap-4">
              <p>Question: {content} </p>
              <ul className="grid grid-cols-2 gap-x-8">
                {answers.map((answer, id) => (
                  <li
                    key={id}
                    className={
                      answer.isCorrect ? "text-green-600" : "text-red-600"
                    }
                  >
                    - {answer.content}{" "}
                    {answer.isCorrect ? "(Correct)" : "(Incorrect)"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <FormSubmit variant="destructive" className="w-full">
            Delete
            <Trash className="ml-2 h-4 w-4" />
          </FormSubmit>
        </form>
      </CardContent>
    </Card>
  );
};

export default Question;
