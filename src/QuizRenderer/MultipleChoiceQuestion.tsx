import React, { SetStateAction, useEffect, useState } from "react";
import { MCQtype } from "../utils/allQuizQuestions";
import { Header1 } from "../utils/styledComponents";
import { useAppSelector } from "../store/state";
import { selectQuesNum } from "../selectors/answers-data-selector";
import { tapAudio } from "../utils/audioManager";
import { sheetAnswerChecker } from "../utils/correctAnswerChecker";

interface MultipleChoiceProps {
  question: MCQtype;
  setAnswers: React.Dispatch<
    SetStateAction<{ [key: string]: string | string[] | { [key: string]: string } }>
  >;
  canProceed: boolean;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MultipleChoiceQuestion({
  question,
  setAnswers,
  canProceed,
  setCanProceed,
}: MultipleChoiceProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const quesNum = useAppSelector(selectQuesNum);

  useEffect(() => {
    setActiveIndex(-1);
  }, [quesNum]);

  const handleSelectAns = (e: any, index: SetStateAction<number>) => {
    tapAudio.play();
    const selectedAnswer = e.target.innerText;
    setActiveIndex(canProceed && activeIndex === index ? -1 : index);
    // Save the answer to the state
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`${question.question_number}`]: sheetAnswerChecker(question, selectedAnswer),
    }));

    setCanProceed(activeIndex !== index);
  };

  return (
    <>
      {question.image && <img src={`/images/${question.image}`} alt="quiz-image" />}
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
