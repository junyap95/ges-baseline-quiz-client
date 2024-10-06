import React, { SetStateAction, useEffect, useState } from "react";
import { MCQtype } from "../utils/allQuizQuestions";
import { Header1, QuizImage } from "../utils/styledComponents";
import { useAppSelector } from "../store/state";
import { selectQuesNum } from "../selectors/answers-data-selector";

interface MultipleChoiceProps {
  question: MCQtype;
  setAnswers: React.Dispatch<
    SetStateAction<{ [key: string]: string | string[] | { [key: string]: string } }>
  >;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MultipleChoiceQuestion({
  question,
  setAnswers,
  setCanProceed,
}: MultipleChoiceProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const quesNum = useAppSelector(selectQuesNum);

  useEffect(() => {
    setActiveIndex(null);
  }, [quesNum]);

  const handleSelectAns = (e: any, index: SetStateAction<number | null>) => {
    const selectedAnswer = e.target.innerText;
    setActiveIndex(index);
    // Save the answer to the state
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`${question.question_number}`]: selectedAnswer,
    }));

    setCanProceed(true);
  };

  return (
    <>
      {question.image && (
        <QuizImage src={require(`../images/${question.image}`)} alt="quiz-image" />
      )}
      <Header1>{question.question_text}</Header1>
      <div className="quiz-questions">
        {question.possible_answers?.map((ans, index) => (
          <button
            key={index}
            onClick={(e) => handleSelectAns(e, index)}
            className={`btn-next visible question ${activeIndex === index ? "active" : ""}`}
          >
            {ans}
          </button>
        ))}
      </div>
    </>
  );
}
