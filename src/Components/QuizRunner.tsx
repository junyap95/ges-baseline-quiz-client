import { useCallback, useEffect, useState } from "react";
import { literacy_questions, numeracy_questions, Question } from "../utils/allQuizQuestions";
import { PASSING_PERCENTAGE } from "../utils/constants";
import DragAndDropQuestion from "../QuizRenderer/DragAndDropQuestion";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import MultipleChoiceQuestion from "../QuizRenderer/MultipleChoiceQuestion";
import { correctAnswerChecker } from "../utils/correctAnswerChecker";
import { useDispatch } from "react-redux";
import { clearCorrectCount, incrementCorrectCount } from "../features/userAnswersDataSlice";
import { useAppSelector } from "../store/state";
import { selectCorrectCount } from "../selectors/AnswersDataSelector";

type Level = "lvl1" | "lvl2" | "lvl3";

export default function QuizRunner() {
  const dispatch = useDispatch();
  const correctCount = useAppSelector(selectCorrectCount);
  const location = useLocation();
  const { topic } = queryString.parse(location.search);
  const quizQuestions = topic === "numeracy" ? numeracy_questions : literacy_questions;

  const [quesNum, setQuesNum] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<Level>("lvl1");
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [isQuizTerminated, setIsQuizTerminated] = useState(false);
  // State to track which button is active
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [canProceed, setCanProceed] = useState(false);

  // Quiz data: levels and questions
  const allQuestions: Record<Level, Question[]> = {
    lvl1: quizQuestions.level1,
    lvl2: quizQuestions.level2,
    lvl3: quizQuestions.level3,
  };

  // Get the current level's questions information
  const currentQuestion = allQuestions[currentLevel][quesNum];
  const totalQuestions = allQuestions[currentLevel].length;

  // Handle moving to the next question
  const handleNext = useCallback(() => {
    if (canProceed) {
      setActiveIndex(null);
      setCanProceed(false);
      // if (quesNum < totalQuestions) {
      // before going to next question, check if answer is correct
      const userAnswer = answers[currentQuestion.question_number];

      console.log(correctAnswerChecker(currentQuestion, userAnswer));
      let updatedCorrectCount = correctCount;
      if (correctAnswerChecker(currentQuestion, userAnswer)) {
        dispatch(incrementCorrectCount());
        updatedCorrectCount++;
      }
      if (quesNum + 1 < totalQuestions) {
        setQuesNum((prev) => prev + 1);
      } else {
        // Calculate the percentage of correct answers for the current level
        const correctPercentage = updatedCorrectCount / totalQuestions;

        console.log("mark?", correctPercentage);
        // Check if the player has passed the level
        if (correctPercentage >= PASSING_PERCENTAGE) {
          // Proceed to the next level if available
          if (currentLevel === "lvl1") {
            setCurrentLevel("lvl2");
          } else if (currentLevel === "lvl2") {
            setCurrentLevel("lvl3");
          } else {
            // Last level is completed successfully
            console.log("Quiz completed successfully!");
          }
        } else {
          // Terminate the quiz if the player did not pass
          setIsQuizTerminated(true);
        }

        // Reset question number and correct answers count for the next level
        setQuesNum(0);
        dispatch(clearCorrectCount());
      }
    }
  }, [
    answers,
    canProceed,
    correctCount,
    currentLevel,
    currentQuestion,
    dispatch,
    quesNum,
    totalQuestions,
  ]);

  // Render termination message if the quiz is terminated
  if (isQuizTerminated) {
    console.log("all answer terminated", answers);
    return <div>Well done! The quiz has ended. Thank you for participating!</div>;
  }

  // Render the appropriate question style
  const renderQuestion = (currentQuestion: Question) => {
    switch (currentQuestion.question_style) {
      case "multiple_choice_question":
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setAnswers={setAnswers}
            setCanProceed={setCanProceed}
          />
        );
      case "drag_and_drop":
        return (
          <DragAndDropQuestion
            question={currentQuestion}
            setCanProceed={setCanProceed}
            setAnswers={setAnswers}
          />
        );
      //   case "matching":
      //     return <MatchingQuestion question={currentQuestion} />;
      //   case "fill_in_the_blanks":
      //     return <FillInTheBlanksQuestion question={currentQuestion} />;
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          {renderQuestion(currentQuestion)}
          <button onClick={handleNext} className="btn-quiz-submit">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
