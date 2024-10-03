import { useState } from "react";
import { numeracy_questions, Question } from "../utils/numeracy_questions";

type Level = "lvl1" | "lvl2" | "lvl3";

export default function NumeracyQuiz() {
  const [quesNum, setQuesNum] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<Level>("lvl1");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizTerminated, setIsQuizTerminated] = useState(false);

  // Quiz data: levels and questions
  const allQuestions: Record<Level, Question[]> = {
    lvl1: numeracy_questions.level1,
    lvl2: numeracy_questions.level2,
    lvl3: numeracy_questions.level3,
  };

  // Get the current level's questions
  const currentQuestions = allQuestions[currentLevel];
  const totalQuestions = currentQuestions.length;

  // Handle selecting an answer
  const handleSelectAns = (e: any) => {
    const selectedAnswer = e.target.innerText;
    const correctAnswer = currentQuestions[quesNum].correct_answer;

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
    if (quesNum < totalQuestions - 1) {
      setQuesNum(quesNum + 1);
    } else {
      // Calculate the percentage of correct answers for the current level
      const correctPercentage = (correctAnswersCount / totalQuestions) * 100;

      // Check if the player has passed the level
      if (correctPercentage >= 80) {
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
  };

  // Render termination message if the quiz is terminated
  if (isQuizTerminated) {
    return <div>The quiz has ended. Thank you for participating!</div>;
  }

  return (
    <>
      <div>{currentQuestions[quesNum].question_text}</div>
      {currentQuestions[quesNum].possible_answers?.map((ans, index) => (
        <button key={index} onClick={handleSelectAns}>
          {ans}
        </button>
      ))}
      <button onClick={handleNext}>Submit</button>
    </>
  );
}
