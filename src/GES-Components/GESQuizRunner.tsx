import queryString from "query-string";
import { useRef, useState, useCallback, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ConfirmButton from "../Components/ConfirmButton";
import ProgressBar from "../Components/ProgressBar";
import getQuestionRendererWrapper from "../QuizRenderer/QuestionRendererWrapper";
import {
  Level,
  updateState,
  updateTimer,
  userSubmitAnswer,
} from "../redux-data-slice/gesAnswersDataSlice";
import {
  selectQuesNum,
  selectCurrentLevel,
  selectIsQuizTerminated,
  selectIsCheckPoint,
  selectCurrentQuestion,
  selectLevelLength,
  selectUserAnswer,
} from "../selectors/ges-data-selector";
import { useGesSelector } from "../store/state";
import { confirmAudio, clickAudio, correctAudio, wrongAudio } from "../utils/audioManager";
import GESCheckPoint from "./GESCheckPoint";
import GESEndingScreen from "./GESEndingScreen";
import AnswerPopup from "./Components/AnswerPopup";
import { correctAnswerChecker } from "../utils/correctAnswerChecker";
import { getQuestions } from "../utils/helperFunctions";
import { useBeforeBack } from "../utils/customHooks";

export default function GESQuizRunner() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { topic } = queryString.parse(location.search) as { topic: string };
  sessionStorage.setItem("topic", topic);
  const ques = getQuestions(topic); // get questions based on topic from local storage

  const nodeRef = useRef(null); // ref for hint object
  const nodeRefHintBubble = useRef(null); // ref for hint bubble

  const quesNum = useGesSelector(selectQuesNum); // initially 0
  const currentLevel = useGesSelector(selectCurrentLevel); // initially el1
  const isQuizTerminated = useGesSelector(selectIsQuizTerminated); // initially false
  const isCheckPoint = useGesSelector(selectIsCheckPoint); // initially false
  const currentQuestion = useGesSelector(selectCurrentQuestion);
  const currentUserAnswer = useGesSelector(selectUserAnswer);
  const currentLevelLength = useGesSelector(selectLevelLength);

  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | string[] | { [key: string]: string };
  }>({}); /** should be removed later on */
  const [canProceed, setCanProceed] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answerPopup, setAnswerPopup] = useState(false);
  const [currentAnswerCorrect, setCurrentAnswerCorrect] = useState(false);
  const [timeSpent, setTimeSpent] = useState(new Date());

  const handleHideHint = useCallback(() => {
    setShowHint(false);
  }, []);

  // Handle moving to the next question
  const handleNext = useCallback(() => {
    setShowHint(false);
    if (!canProceed) return;
    confirmAudio.play();
    const isCurrentAnswerCorrect = correctAnswerChecker(currentQuestion, currentUserAnswer);
    setAnswerPopup(true);
    setCurrentAnswerCorrect(true);

    if (isCurrentAnswerCorrect) {
      correctAudio.play();
      // set pop up, then dispatch
      const timer = setTimeout(() => {
        dispatch(userSubmitAnswer());
      }, 800);
      return () => clearTimeout(timer);
    } else {
      wrongAudio.play();
      setCurrentAnswerCorrect(false);
      setAnswerPopup(true);
    }
  }, [canProceed, currentQuestion, currentUserAnswer, dispatch]);

  // if wrong answer, and clicked go next
  const handleGoNext = useCallback(() => {
    const userAnswer = userAnswers[currentQuestion.question_number];
    setCurrentAnswerCorrect(userAnswer === "RIGHT");
    dispatch(userSubmitAnswer());
  }, [currentQuestion.question_number, dispatch, userAnswers]);

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
    if (ques) {
      const allLevels = Object.keys(ques) as Level[];
      const initialLevel = allLevels[0];
      let timeInitialised: { [key: string]: number } = {};
      for (const level of allLevels) timeInitialised[level] = 0;
      // const shuffledQuestions = shuffleQuestionsByLevel(ques);
      dispatch(
        updateState({
          allQuestions: ques,
          allLevels: allLevels,
          currentLevel: initialLevel,
          levelLength: ques[initialLevel].length,
          currentQuestion: ques[initialLevel][0],
          timeSpent: timeInitialised,
          scores: Array.from(allLevels, () => 0),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAnswerPopup(false);
    setShowHint(false);
    setCanProceed(false);
    setResetAnimation(false); // Hide the element first
    const timer = setTimeout(() => setResetAnimation(true), 1000); // Re-add it to trigger the animation
    return () => clearTimeout(timer);
  }, [currentLevel, quesNum, isQuizTerminated]);

  // Timer useEffect at checkpoint
  useEffect(() => {
    if (isCheckPoint || isQuizTerminated) {
      if (isCheckPoint && isQuizTerminated) return;
      const timeTakenUpToNow = new Date().getTime() - timeSpent.getTime();
      dispatch(updateTimer(timeTakenUpToNow));
    }
    if (!isCheckPoint && !isQuizTerminated) setTimeSpent(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isCheckPoint, isQuizTerminated]);

  useBeforeBack(true);

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
              <ProgressBar questionLen={currentLevelLength} questionNumber={quesNum} />
            )}
          </div>

          <div className="intro-msg">
            {isQuizTerminated ? (
              <GESEndingScreen />
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
