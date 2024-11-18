import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { MCQtype } from "../utils/allQuizQuestions";
import { Header1 } from "../utils/styledComponents";
import { tapAudio } from "../utils/audioManager";
import { shuffle } from "lodash";
import { useDispatch } from "react-redux";
import { userSetAnswer } from "../redux-data-slice/gesAnswersDataSlice";
import { resultTextDisplayer } from "../utils/correctAnswerChecker";

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
  canProceed,
  setAnswers,
  setCanProceed,
}: MultipleChoiceProps) {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const shuffledAns = useMemo(() => shuffle(question.possible_answers), [question]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [question]);

  const handleSelectAns = (e: any, index: SetStateAction<number>) => {
    tapAudio.play();
    const selectedAnswer = e.target.innerText;
    setActiveIndex(canProceed && activeIndex === index ? -1 : index);
    // Save the answer to the outer state
    dispatch(userSetAnswer({ answer: selectedAnswer, questionNum: question.question_number }));
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`${question.question_number}`]: resultTextDisplayer(question, selectedAnswer),
    }));
    setCanProceed(activeIndex !== index);
  };

  return (
    <>
      {!!question.image && <img src={question.image} alt="quiz-image" />}
      <Header1>{question.question_text}</Header1>
      <div className="quiz-questions">
        {shuffledAns?.map((ans, index) => (
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
