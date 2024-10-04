import { useState } from "react";
import { Question } from "../utils/allQuizQuestions";

interface DragAndDropQuestionProps {
  question: Question;
  setDndAnswered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DragAndDropQuestion({
  question,
  setDndAnswered,
}: DragAndDropQuestionProps) {
  // State to track answers for each answer box
  const [answers, setAnswers] = useState<string[]>(
    Array(question.possible_answers?.length).fill("")
  );

  // State to track which options are still draggable
  const [activeOptions, setActiveOptions] = useState<any>([...(question.possible_answers || [])]);

  // Allow drop event
  const allowDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };

  // Handle drag event
  const drag = (ev: React.DragEvent<HTMLDivElement>, option: string) => {
    ev.dataTransfer.setData("text", option);
  };

  // Handle drag enter
  const handleDragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.currentTarget.classList.add("drag-over");
  };

  // Handle drag leave
  const handleDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.currentTarget.classList.remove("drag-over");
  };

  // Handle drop event for each answer box
  const drop = (ev: React.DragEvent<HTMLDivElement>, index: number) => {
    ev.preventDefault();
    ev.currentTarget.classList.remove("drag-over");

    const draggedOption = ev.dataTransfer.getData("text");

    // Update the answer for the specific answer box
    const newAnswers = [...answers];
    const previousAnswer = newAnswers[index];
    newAnswers[index] = draggedOption;
    setAnswers(newAnswers);
    console.log("act", activeOptions.length);
    if (activeOptions.length - 1 === 0) {
      setDndAnswered(true);
    }
    // Update active options
    const newActiveOptions = [...activeOptions];
    if (previousAnswer) {
      // Add the previously occupied answer back to active options
      newActiveOptions.push(previousAnswer);
    }
    // Remove the newly dropped answer from active options
    const draggedOptionIndex = newActiveOptions.indexOf(draggedOption);
    if (draggedOptionIndex > -1) {
      newActiveOptions.splice(draggedOptionIndex, 1);
    }
    setActiveOptions(newActiveOptions);
  };

  const handleClear = () => {
    setActiveOptions([...(question.possible_answers || [])]);

    setAnswers(Array(question.possible_answers?.length).fill(""));
  };

  return (
    <div className="quiz-container">
      <div className="question">
        <p>
          <strong>{question.question_text}</strong>
        </p>
      </div>

      <div className="options">
        {question.possible_answers?.map((ans, index) => (
          <div
            key={index}
            className={`option ${activeOptions.includes(`${ans}`) ? "" : "inactive"}`}
            draggable={activeOptions.includes(`${ans}`)}
            onDragStart={(e) => drag(e, `${ans}`)}
          >
            {ans}
          </div>
        ))}
      </div>

      <div className="options answer-boxes">
        {answers.map((answer, index) => (
          <div
            key={index}
            id={`answer-box-${index}`}
            className="option answer-box"
            onDrop={(e) => drop(e, index)}
            onDragOver={allowDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            {answer || "Drag your answer here"}
            {/* <p className={`result ${result[index] === "Correct!" ? "correct" : "incorrect"}`}>
              {result[index]}
            </p> */}
          </div>
        ))}
      </div>
      <button className="btn-quiz-submit" onClick={handleClear}>
        CLEAR
      </button>
    </div>
  );
}
