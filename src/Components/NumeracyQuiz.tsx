import { SetStateAction, useState } from "react";
import { literacy_questions, numeracy_questions, Question } from "../utils/allQuizQuestions";
import { PASSING_PERCENTAGE } from "../utils/constants";
import { Header1, QuizImage } from "../utils/styledComponents";
import DragAndDropQuestion from "./DragAndDropQuestion";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

type Level = "lvl1" | "lvl2" | "lvl3";

export default function NumeracyQuiz() {
  const location = useLocation();
  const { topic } = queryString.parse(location.search);
  const quizQuestions = topic === "numeracy" ? numeracy_questions : literacy_questions;

  const [quesNum, setQuesNum] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<Level>("lvl1");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizTerminated, setIsQuizTerminated] = useState(false);
  // State to track which button is active
  const [activeIndex, setActiveIndex] = useState<Number | null>(null);
  const [dndAnswered, setDndAnswered] = useState(false);

  // Quiz data: levels and questions
  const allQuestions: Record<Level, Question[]> = {
    lvl1: quizQuestions.level1,
    lvl2: quizQuestions.level2,
    lvl3: quizQuestions.level3,
  };

  // Get the current level's questions
  const currentQuestions = allQuestions[currentLevel];
  const totalQuestions = currentQuestions.length;

  // Handle selecting an answer: MCQ
  const handleSelectAns = (e: any, index: SetStateAction<Number | null>) => {
    const selectedAnswer = e.target.innerText;
    const correctAnswer = currentQuestions[quesNum].correct_answer;
    setActiveIndex(index);

    // Save the answer to the state
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`${currentLevel}_${quesNum}`]: selectedAnswer,
    }));

    // Update correct answers count if the answer is correct
    if (selectedAnswer === correctAnswer) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
  };

  // Handle moving to the next question
  const handleNext = () => {
    if (activeIndex !== null || dndAnswered) {
      setActiveIndex(null);
      setDndAnswered(false);
      if (quesNum < totalQuestions - 1) {
        setQuesNum(quesNum + 1);
      } else {
        // Calculate the percentage of correct answers for the current level
        const correctPercentage = correctAnswersCount / totalQuestions;

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
        setCorrectAnswersCount(0);
      }
    }
  };

  // Render termination message if the quiz is terminated
  if (isQuizTerminated) {
    return <div>Well done! The quiz has ended. Thank you for participating!</div>;
  }

  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          {currentQuestions[quesNum].question_style === "drag_and_drop" ? (
            <DragAndDropQuestion
              question={currentQuestions[quesNum]}
              setDndAnswered={setDndAnswered}
            />
          ) : (
            <>
              {currentQuestions[quesNum].image && (
                <QuizImage
                  src={require(`../images/${currentQuestions[quesNum].image}`)}
                  alt="quiz-image"
                />
              )}
              <Header1>{currentQuestions[quesNum].question_text}</Header1>
              <div className="quiz-questions">
                {currentQuestions[quesNum].possible_answers?.map((ans, index) => (
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
          )}
          <button onClick={handleNext} className="btn-quiz-submit">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
