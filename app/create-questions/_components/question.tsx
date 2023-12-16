import { deleteQuestion } from "@/app/actions/delete-questions";
import { Button } from "@/components/ui/button";

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
      <Button size="sm" variant="destructive" type="submit">
        Delete
      </Button>
    </form>
  );
};

export default Question;
