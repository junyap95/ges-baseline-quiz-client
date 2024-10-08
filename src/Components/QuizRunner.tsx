import { useCallback, useEffect, useState } from "react";
import { literacy_questions, numeracy_questions } from "../utils/allQuizQuestions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { setIsCheckPoint, userSubmitAnswer } from "../features/userAnswersDataSlice";
import { useAppSelector } from "../store/state";
import {
  selectCurrentLevel,
  selectIsQuizTerminated,
  selectQuesNum,
  selectIsCheckPoint,
} from "../selectors/answers-data-selector";
import QuestionRendererWrapper from "../QuizRenderer/QuestionRendererWrapper";
import EndingScreen from "./EndingScreen";
import { QuizTopic } from "../utils/constants";
import ConfirmButton, { CheckPointButton } from "./ConfirmButton";
import StudySeedLogo from "../images/studyseed-logo-stroke.png";
import ProgressBar from "./ProgressBar";
import SamHint from "../images/sam-hint.png";
import "../hintPopupStyles.css";

export default function QuizRunner() {
  const location = useLocation();
  const { topic } = queryString.parse(location.search);
  const quizQuestions = topic === QuizTopic.NUMERACY ? numeracy_questions : literacy_questions;

  const dispatch = useDispatch();
  const quesNum = useAppSelector(selectQuesNum); // 0
  const currentLevel = useAppSelector(selectCurrentLevel); // 1
  const isQuizTerminated = useAppSelector(selectIsQuizTerminated); // false
  const isCheckPoint = useAppSelector(selectIsCheckPoint); // false

  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | string[] | { [key: string]: string };
  }>({});
  const [canProceed, setCanProceed] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Get the current level's questions information
  const currentQuestion = quizQuestions[currentLevel][quesNum];
  const totalQuestions = quizQuestions[currentLevel].length;

  // Handle moving to the next question
  const handleNext = useCallback(() => {
    if (isCheckPoint) return;
    if (canProceed) {
      const userAnswer = userAnswers[currentQuestion.question_number];
      dispatch(userSubmitAnswer({ userAnswer, currentQuestion, totalQuestions }));
    }
  }, [isCheckPoint, canProceed, userAnswers, currentQuestion, dispatch, totalQuestions]);

  const handleCheckPoint = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(e.currentTarget.value);
      e.currentTarget.value === "YES"
        ? dispatch(setIsCheckPoint({ isCheckPoint: false, isQuizTerminated: false }))
        : dispatch(setIsCheckPoint({ isCheckPoint: true, isQuizTerminated: true }));
    },
    [dispatch]
  );

  const handleHint = useCallback(() => {
    setShowHint(!showHint);
  }, [showHint]);

  useEffect(() => {
    setCanProceed(false);
    setShowHint(false);
    setResetAnimation(false); // Hide the element first
    const timer = setTimeout(() => setResetAnimation(true), 2000); // Re-add it to trigger the animation
    return () => clearTimeout(timer);
  }, [quesNum, isQuizTerminated]);

  console.log("all ans", userAnswers);

  return (
    <>
      <div className="quiz-intro">
        <div className="logo-fixed">
          <img src={StudySeedLogo} alt="Studyseed Logo" />
          {!isQuizTerminated && (
            <ProgressBar questionLen={totalQuestions} questionNumber={quesNum} />
          )}
        </div>

        <div className="intro-msg">
          {isQuizTerminated ? (
            <EndingScreen />
          ) : (
            <>
              {isCheckPoint ? (
                <div>
                  Checkpoint
                  <CheckPointButton onClickHandler={handleCheckPoint} yesOrNo={true} />
                  <CheckPointButton onClickHandler={handleCheckPoint} yesOrNo={false} />
                </div>
              ) : (
                <>
                  <QuestionRendererWrapper /* switch-case */
                    currentQuestion={currentQuestion}
                    setAnswers={setUserAnswers}
                    canProceed={canProceed}
                    setCanProceed={setCanProceed}
                  />
                  <ConfirmButton onClickHandler={handleNext} proceedCondition={canProceed} />
                </>
              )}
            </>
          )}
        </div>

        {resetAnimation && !isQuizTerminated ? (
          <div className="hint-container">
            <img
              src={SamHint}
              alt="hint-popup"
              key={quesNum}
              className={resetAnimation && "sam-hint"}
              onClick={handleHint}
            />
            <div className="hint-bubble" style={{ maxWidth: "40vw" }}>
              {showHint ? "The hint is the hint is ht ehint" : "Need help? Click me"}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
