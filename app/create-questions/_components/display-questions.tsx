import { deleteQuestion } from "@/app/actions/delete-questions";

import FormDeleteButton from "./form-delete-button";

interface QuestionProps {
  id: number;
  content: string;
}

const Question = ({ id, content }: QuestionProps) => {
  const deleteQuestionWithId = deleteQuestion.bind(null, id);
  return (
    <form
      action={deleteQuestionWithId}
      className="flex items-center gap-4 space-y-4"
    >
      <p>Content: {content} </p>
      <FormDeleteButton />
    </form>
  );
};

export default Question;
