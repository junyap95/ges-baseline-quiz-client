import queryString from "query-string";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ConfirmButton from "../Components/ConfirmButton";
import ProgressBar from "../Components/ProgressBar";
import getQuestionRendererWrapper from "../QuizRenderer/QuestionRendererWrapper";
import {
  userSubmitAnswer,
  hydrateState,
  GesAnswersDataState,
  Level,
} from "../redux-data-slice/gesAnswersDataSlice";
import {
  selectQuesNum,
  selectCurrentLevel,
  selectIsQuizTerminated,
  selectIsCheckPoint,
} from "../selectors/ges-data-selector";
import { useGesSelector } from "../store/state";
import { confirmAudio, clickAudio, correctAudio, wrongAudio } from "../utils/audioManager";
import { QuizTopic } from "../utils/constants";
import GESCheckPoint from "./GESCheckPoint";
import GESEndingScreen from "./GESEndingScreen";
import AnswerPopup from "./Components/AnswerPopup";

export default function GESQuizRunner() {
  const location = useLocation();
  const { week, topic } = queryString.parse(location.search) as { week: string; topic: string };
  const getQuestions = () => {
    sessionStorage.setItem("topic", topic);
    return topic === QuizTopic.NUMERACY
      ? JSON.parse(localStorage.getItem("ges-questions") || "{}").num
      : JSON.parse(localStorage.getItem("ges-questions") || "{}").lit;
  };

  const quizQuestions = useMemo(getQuestions, [topic]);

  //////////
  const nodeRef = useRef(null); // ref for hint object
  const nodeRefHintBubble = useRef(null); // ref for hint bubble

  const dispatch = useDispatch();
  const quesNum = useGesSelector(selectQuesNum); // initially 0
  const currentLevel = useGesSelector(selectCurrentLevel); // initially el1
  const isQuizTerminated = useGesSelector(selectIsQuizTerminated); // initially false
  const isCheckPoint = useGesSelector(selectIsCheckPoint); // initially false

  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | string[] | { [key: string]: string };
  }>({});
  const [canProceed, setCanProceed] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(quizQuestions[currentLevel][quesNum]);

  const [answerPopup, setAnswerPopup] = useState(false);
  const [currentAnswerCorrect, setCurrentAnswerCorrect] = useState(false);

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
      if (userAnswer === "RIGHT") {
        correctAudio.play();
        setCurrentAnswerCorrect(true);
        setAnswerPopup(true);
        // set pop up, then dispatch
        const timer = setTimeout(() => {
          dispatch(userSubmitAnswer({ userAnswer, totalQuestions }));
        }, 800);
        return () => clearTimeout(timer);
      } else {
        wrongAudio.play();
        setCurrentAnswerCorrect(false);
        setAnswerPopup(true);
      }
    }
  }, [canProceed, userAnswers, currentQuestion, dispatch, totalQuestions]);

  // if wrong answer, and clicked go next
  const handleGoNext = useCallback(() => {
    const userAnswer = userAnswers[currentQuestion.question_number];
    setCurrentAnswerCorrect(userAnswer === "RIGHT");
    dispatch(userSubmitAnswer({ userAnswer, totalQuestions }));
  }, [currentQuestion.question_number, dispatch, totalQuestions, userAnswers]);

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
    setAnswerPopup(false);
    setShowHint(false);
    setCurrentQuestion(quizQuestions[currentLevel][quesNum]);
    setCanProceed(false);
    setResetAnimation(false); // Hide the element first
    const timer = setTimeout(() => setResetAnimation(true), 1000); // Re-add it to trigger the animation
    return () => clearTimeout(timer);
  }, [currentLevel, quesNum, quizQuestions]);

  useEffect(() => {
    const initialState: GesAnswersDataState = {
      correctCount: 0,
      currentLevel: currentLevel,
      quesNum: 0,
      isQuizTerminated: isQuizTerminated,
      isCheckPoint: isCheckPoint,
      allLevels: Object.keys(quizQuestions) as Level[],
      levelLength: quizQuestions[currentLevel].length,
    };
    dispatch(hydrateState(initialState));
  }, []);

  return (
    <>
      <div className="quiz-intro">
        {answerPopup && (
          <AnswerPopup
            correct={currentAnswerCorrect}
            correctAnswer={JSON.stringify(currentQuestion.correct_answer)}
            hint={currentQuestion.hint}
            onClickHandler={currentAnswerCorrect ? null : handleGoNext}
            questionStyle={currentQuestion?.question_style}
          />
        )}
        <div className="quiz-subcontainer">
          <div className="logo-fixed">
            <img src="./images/studyseed-logo-stroke.png" alt="Studyseed Logo" />
            {!isQuizTerminated && !isCheckPoint && (
              <ProgressBar questionLen={totalQuestions} questionNumber={quesNum} />
            )}
          </div>

          <div className="intro-msg">
            {isQuizTerminated ? (
              <GESEndingScreen userAnswers={userAnswers} />
            ) : (
              <>
                {isCheckPoint ? (
                  <GESCheckPoint currentLevel={currentLevel} />
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
      </div>
    </>
  );
}
