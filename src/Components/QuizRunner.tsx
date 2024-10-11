import { useCallback, useEffect, useRef, useState } from "react";
import { literacy_questions, numeracy_questions } from "../utils/allQuizQuestions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { userSubmitAnswer } from "../redux-data-slice/userAnswersDataSlice";
import { useAppSelector } from "../store/state";
import {
  selectCurrentLevel,
  selectIsQuizTerminated,
  selectQuesNum,
  selectIsCheckPoint,
} from "../selectors/answers-data-selector";
import EndingScreen from "./EndingScreen";
import { QuizTopic } from "../utils/constants";
import ConfirmButton from "./ConfirmButton";
import ProgressBar from "./ProgressBar";
import CheckPoint from "./CheckPoint";
import { CSSTransition } from "react-transition-group";
import getQuestionRendererWrapper from "../QuizRenderer/QuestionRendererWrapper";
import "../hintPopupStyles.css";
import { includes } from "lodash";
const clickSound = require("../assets/click-sound.mp3");
const clickAudio = new Audio(clickSound);
const confirmTap = require("../assets/crisp-tap.mp3");
const confirmAudio = new Audio(confirmTap);

export default function QuizRunner() {
  const location = useLocation();
  const { topic } = queryString.parse(location.search);
  const quizQuestions = topic === QuizTopic.NUMERACY ? numeracy_questions : literacy_questions;
  sessionStorage.setItem("topic", topic as string);
  const nodeRef = useRef(null);

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
  const [currentQuestion, setCurrentQuestion] = useState(quizQuestions[currentLevel][quesNum]);

  // Get the current level's questions information
  // const currentQuestion = quizQuestions[currentLevel][quesNum];
  const totalQuestions = quizQuestions[currentLevel].length;

  // Handle moving to the next question
  const handleNext = useCallback(() => {
    if (isCheckPoint) return;
    if (canProceed) {
      confirmAudio.play();
      const userAnswer = userAnswers[currentQuestion.question_number];
      dispatch(userSubmitAnswer({ userAnswer, currentQuestion, totalQuestions }));
    }
  }, [isCheckPoint, canProceed, userAnswers, currentQuestion, dispatch, totalQuestions]);

  const handleHint = useCallback(() => {
    clickAudio.play();
    const storedArr = sessionStorage.getItem("hintsUsage");
    if (!storedArr) {
      sessionStorage.setItem("hintsUsage", JSON.stringify([currentQuestion.question_number]));
    } else {
      const arr: string[] = JSON.parse(storedArr);
      if (!arr.includes(currentQuestion.question_number)) arr.push(currentQuestion.question_number);
      sessionStorage.setItem("hintsUsage", JSON.stringify(arr));
    }

    console.log(`${currentQuestion.question_number}-${currentLevel}`);
    setShowHint(!showHint);
  }, [currentLevel, currentQuestion.question_number, showHint]);

  const handleHideHint = useCallback(() => {
    setShowHint(false);
  }, []);

  useEffect(() => {
    setCurrentQuestion(quizQuestions[currentLevel][quesNum]);
    setCanProceed(false);
    setShowHint(false);
    setResetAnimation(false); // Hide the element first
    const timer = setTimeout(() => setResetAnimation(true), 1000); // Re-add it to trigger the animation
    return () => clearTimeout(timer);
  }, [quesNum, isQuizTerminated, quizQuestions, currentLevel]);

  return (
    <>
      <div className="quiz-intro">
        <div className="quiz-subcontainer">
          <div className="logo-fixed">
            <img src="./images/studyseed-logo-stroke.png" alt="Studyseed Logo" />
            {!isQuizTerminated && !isCheckPoint && (
              <ProgressBar questionLen={totalQuestions} questionNumber={quesNum} />
            )}
          </div>

          <div className="intro-msg">
            {isQuizTerminated ? (
              <EndingScreen userAnswers={userAnswers} />
            ) : (
              <>
                {isCheckPoint ? (
                  <CheckPoint currentLevel={currentLevel} />
                ) : (
                  <>
                    {getQuestionRendererWrapper({
                      currentQuestion,
                      setAnswers: setUserAnswers,
                      canProceed,
                      setCanProceed,
                    })}
                    <ConfirmButton onClickHandler={handleNext} proceedCondition={canProceed} />
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="hint-container">
          <CSSTransition
            in={resetAnimation && !isQuizTerminated && !isCheckPoint}
            timeout={500}
            classNames="slide"
            unmountOnExit
            nodeRef={nodeRef}
          >
            <img
              ref={nodeRef}
              src="/images/sam-hint-banner.png"
              alt="hint-popup"
              key={quesNum}
              className={"sam-hint"}
              onClick={handleHint}
            />
          </CSSTransition>

          <CSSTransition
            nodeRef={nodeRef}
            in={showHint}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <p ref={nodeRef} className="hint-bubble">
              {currentQuestion.hint} <button onClick={handleHideHint}>Close Hint</button>
            </p>
          </CSSTransition>
        </div>
        {/* <div className="audio-credit">
          <small>Sound from Zapslat.com</small>
        </div> */}
      </div>
    </>
  );
}
