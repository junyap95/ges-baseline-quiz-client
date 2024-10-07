import { useCallback, useState } from "react";
import { literacy_questions, numeracy_questions } from "../utils/allQuizQuestions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { userSubmitAnswer } from "../features/userAnswersDataSlice";
import { useAppSelector } from "../store/state";
import {
  selectCurrentLevel,
  selectIsQuizTerminated,
  selectQuesNum,
} from "../selectors/answers-data-selector";
import QuestionRendererWrapper from "../QuizRenderer/QuestionRendererWrapper";
import EndingScreen from "./EndingScreen";
import { QuizTopic } from "../utils/constants";

export default function QuizRunner() {
  const location = useLocation();
  const { topic } = queryString.parse(location.search);
  const quizQuestions = topic === QuizTopic.NUMERACY ? numeracy_questions : literacy_questions;

  const dispatch = useDispatch();
  const quesNum = useAppSelector(selectQuesNum); // 0
  const currentLevel = useAppSelector(selectCurrentLevel); // 1
  const isQuizTerminated = useAppSelector(selectIsQuizTerminated); // false
  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | string[] | { [key: string]: string };
  }>({});
  // State to track which button is active
  const [canProceed, setCanProceed] = useState(false);

  // Get the current level's questions information
  const currentQuestion = quizQuestions[currentLevel][quesNum];
  const totalQuestions = quizQuestions[currentLevel].length;

  // Handle moving to the next question
  const handleNext = useCallback(() => {
    if (canProceed) {
      setCanProceed(false);
      const userAnswer = userAnswers[currentQuestion.question_number];
      dispatch(userSubmitAnswer({ userAnswer, currentQuestion, totalQuestions }));
    }
  }, [userAnswers, canProceed, currentQuestion, dispatch, totalQuestions]);

  console.log("all ans", userAnswers);

  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          {isQuizTerminated ? (
            <EndingScreen />
          ) : (
            <>
              <QuestionRendererWrapper
                currentQuestion={currentQuestion}
                setAnswers={setUserAnswers}
                setCanProceed={setCanProceed}
              />
              <button onClick={handleNext} className={`submit ${canProceed && "proceed"}`}>
                Confirm
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
