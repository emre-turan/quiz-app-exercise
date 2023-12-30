"use client";

import { useState } from "react";

import { Question, jsQuiz, resultInitialState } from "@/lib/questions";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import AnswerTimer from "./answer-timer";

interface QuizQuestionProps {
  questions: Question[];
}

const QuizModal = ({ questions }: QuizQuestionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (answer: string, index: number) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else setAnswer(false);
  };

  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          },
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };

  const handleTimeUp = () => {};

  return (
    <div className="relative mt-20 w-[750px] rounded-lg border p-10">
      {!showResult ? (
        <>
          <AnswerTimer duration={10} onTimeUp={handleTimeUp} />
          <span className="text-2xl">{currentQuestion + 1}</span>/
          <span>{questions.length}</span>
          <h2 className="my-4 text-lg">{question}</h2>
          <ul className="mt-5">
            {choices &&
              choices.map((answer, index) => (
                <li
                  onClick={() => onAnswerClick(answer, index)}
                  key={answer}
                  className={cn(
                    "mt-4 cursor-pointer rounded-lg border p-3 text-start",
                    answerIdx === index
                      ? "bg-red-700 text-white dark:text-black"
                      : "",
                  )}
                >
                  {answer}
                </li>
              ))}
          </ul>
          <div className="mt-4">
            <Button
              className="w-full"
              disabled={answerIdx === null}
              onClick={onClickNext}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </>
      ) : (
        <div className="">
          <h3>Result:</h3>
          <p>
            Total Questions : <span>{questions.length}</span>
          </p>
          <p>
            Total Score : <span>{result.score}</span>
          </p>
          <p>
            Correct Answers : <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers : <span>{result.wrongAnswers}</span>
          </p>
          <Button className="mt-4 w-full" onClick={onTryAgain}>
            Try Again?
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizModal;
