import "../hintPopupStyles.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSubmitAnswer } from "../redux-data-slice/userAnswersDataSlice";
import {
  selectCurrentLevel,
  selectIsQuizTerminated,
  selectQuesNum,
  selectIsCheckPoint,
} from "../selectors/answers-data-selector";
import { useAppSelector } from "../store/state";
import { literacy_questions, numeracy_questions } from "../utils/allQuizQuestions";
import { clickAudio, confirmAudio } from "../utils/audioManager";
import { QuizTopic } from "../utils/constants";
import EndingScreen from "./EndingScreen";
import ConfirmButton from "./ConfirmButton";
import ProgressBar from "./ProgressBar";
import CheckPoint from "./CheckPoint";
import getQuestionRendererWrapper from "../QuizRenderer/QuestionRendererWrapper";
import queryString from "query-string";

export default function QuizRunner() {
  const location = useLocation();
  const { topic } = queryString.parse(location.search);
  const quizQuestions = topic === QuizTopic.NUMERACY ? numeracy_questions : literacy_questions;
  sessionStorage.setItem("topic", topic as string);
  const nodeRef = useRef(null); // ref for hint object
  const nodeRefHintBubble = useRef(null); // ref for hint bubble

  const dispatch = useDispatch();
  const quesNum = useAppSelector(selectQuesNum); // initially 0
  const currentLevel = useAppSelector(selectCurrentLevel); // initially 1
  const isQuizTerminated = useAppSelector(selectIsQuizTerminated); // initially false
  const isCheckPoint = useAppSelector(selectIsCheckPoint); // initially false

  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | string[] | { [key: string]: string };
  }>({});
  const [canProceed, setCanProceed] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(quizQuestions[currentLevel][quesNum]);

  // Get the current level's questions information
  const totalQuestions = quizQuestions[currentLevel].length;

  const handleHideHint = useCallback(() => {
    setShowHint(false);
  }, []);

  // Handle moving to the next question
  const handleNext = useCallback(() => {
    setShowHint(false);
    if (canProceed) {
      confirmAudio.play();
      const userAnswer = userAnswers[currentQuestion.question_number];
      dispatch(userSubmitAnswer({ userAnswer, totalQuestions }));
    }
  }, [canProceed, userAnswers, currentQuestion, dispatch, totalQuestions]);

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
    setShowHint(!showHint);
  }, [currentQuestion.question_number, showHint]);

  useEffect(() => {
    setShowHint(false);
    setCurrentQuestion(quizQuestions[currentLevel][quesNum]);
    setCanProceed(false);
    setResetAnimation(false); // Hide the element first
    const timer = setTimeout(() => setResetAnimation(true), 1000); // Re-add it to trigger the animation
    return () => clearTimeout(timer);
  }, [quesNum, isQuizTerminated, quizQuestions, currentLevel]);

  return (
    <>
      <div className="quiz-intro">
        <div className="quiz-subcontainer">
          <div className="logo-fixed">
            <img
              src="https://ik.imagekit.io/jbyap95/tr:w-500/studyseed-logo-stroke.png?updatedAt=1729092924066"
              alt="Studyseed Logo"
            />
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
            nodeRef={nodeRefHintBubble}
            in={showHint}
            timeout={500}
            classNames="slide"
            unmountOnExit
          >
            <p ref={nodeRefHintBubble} className="hint-bubble">
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
