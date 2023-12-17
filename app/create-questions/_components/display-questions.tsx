import { deleteQuestion } from "@/app/actions/delete-questions";

import FormDeleteButton from "./form-delete-button";

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
    <form
      action={deleteQuestionWithId}
      className="flex items-center gap-4 space-y-4"
    >
      <p>Content: {content} </p>
      <ul>
        {answers.map((answer, index) => (
          <li
            key={index}
            className={answer.isCorrect ? "text-green-600" : "text-red-600"}
          >
            {answer.content} {answer.isCorrect ? "(Correct)" : "(Incorrect)"}
          </li>
        ))}
      </ul>
      <FormDeleteButton />
    </form>
  );
};

export default Question;
