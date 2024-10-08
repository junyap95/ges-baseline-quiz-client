import React, { SetStateAction, useCallback, useEffect } from "react";
import { MatchType } from "../utils/allQuizQuestions";
import { Header1, QuizImage } from "../utils/styledComponents";
import { clearConnections, handleConnect, updateOption } from "../features/matchQuesDataSlice";
import { useDispatch } from "react-redux";
import MatchingQuesRunner from "./MatchingQuesRunner";
import { selectConnections } from "../selectors/match-ques-selector";
import { useAppSelector } from "../store/state";
const clickSound = require("../assets/click-sound.mp3");

interface MatchingProps {
  question: MatchType;
  setAnswers: React.Dispatch<
    SetStateAction<{ [key: string]: string | string[] | { [key: string]: string } }>
  >;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MatchingQuestion({ question, setAnswers, setCanProceed }: MatchingProps) {
  const dispatch = useDispatch();
  const connections = useAppSelector(selectConnections);

  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const handleSelectOpt = (e: any) => {
    playSound();
    const targetId = e.currentTarget.id;
    dispatch(updateOption({ targetId }));
  };

  const handleSelectAns = (e: any) => {
    const targetId: string = e.currentTarget.id;
    dispatch(handleConnect({ targetId }));
  };

  const handleRestart = () => {
    dispatch(clearConnections());
  };

  useEffect(() => {
    if (Object.keys(connections).length === question.options.length) {
      setAnswers((prev) => ({
        ...prev,
        [`${question.question_number}`]: connections,
      }));
      setCanProceed(true);
    }
  }, [connections, question.options.length, question.question_number, setAnswers, setCanProceed]);

  // if (Object.keys(connections).length === question.options.length) {
  //   setAnswers((prev) => ({
  //     ...prev,
  //     [`${question.question_number}`]: connections,
  //   }));
  //   setCanProceed(true);
  // }

  return (
    <>
      {question.image && (
        <QuizImage src={require(`../images/${question.image}`)} alt="quiz-image" />
      )}
      <Header1>{question.question_text}</Header1>
      <small>Click a left and a right box to match them!</small>
      <div className="matching-question-container">
        <MatchingQuesRunner
          question={question}
          connections={connections}
          handleSelectOpt={handleSelectOpt}
          handleSelectAns={handleSelectAns}
        />
      </div>
      <button className="btn-next visible submit" onClick={handleRestart}>
        Restart
      </button>
    </>
  );
}
