import { Container } from "@/components/ui/container";

import { db } from "@/lib/db";
import Question from "./_components/display-questions";
import Form from "./_components/form";


const CreateQuestionsPage = async () => {
  const questions = await db.question.findMany({
    include: {
      answers: true,
    },
  });

  return (
    <Container>
      <Form />
      <div className="mt-4 px-8">
        {questions.map((question) => (
          <Question
            key={question.id}
            id={question.id}
            content={question.content}
            answers={question.answers}
          />
        ))}
      </div>
    </Container>
  );
};

export default CreateQuestionsPage;
