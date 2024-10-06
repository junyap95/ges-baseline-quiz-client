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

export default function QuizRunner() {
  const location = useLocation();
  const { topic } = queryString.parse(location.search);
  const quizQuestions = topic === "numeracy" ? numeracy_questions : literacy_questions;

  const dispatch = useDispatch();
  const quesNum = useAppSelector(selectQuesNum);
  const currentLevel = useAppSelector(selectCurrentLevel);
  const isQuizTerminated = useAppSelector(selectIsQuizTerminated);
  const [answers, setAnswers] = useState<{
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
      const userAnswer = answers[currentQuestion.question_number];
      dispatch(userSubmitAnswer({ userAnswer, currentQuestion, totalQuestions }));
    }
  }, [answers, canProceed, currentQuestion, dispatch, totalQuestions]);

  // Render termination message if the quiz is terminated
  if (isQuizTerminated) {
    console.log("all answer terminated", answers);
    return <div>Well done! The quiz has ended. Thank you for participating!</div>;
  }

  console.log("all ans", answers);

  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          <QuestionRendererWrapper
            currentQuestion={currentQuestion}
            setAnswers={setAnswers}
            setCanProceed={setCanProceed}
          />
          <button onClick={handleNext} className="btn-quiz-submit">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
