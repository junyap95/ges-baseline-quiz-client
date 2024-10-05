import { SetStateAction, useState } from "react";
import { Question } from "../utils/allQuizQuestions";
import { Header1 } from "../utils/styledComponents";

interface DragAndDropQuestionProps {
  question: Question;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
  setAnswers: React.Dispatch<SetStateAction<{ [key: string]: string | string[] }>>;
}

export default function DragAndDropQuestion({
  question,
  setCanProceed,
  setAnswers,
}: DragAndDropQuestionProps) {
  // State to track answers for each answer box
  const [dndAnswers, setDndAnswers] = useState<string[]>(
    Array(question.correct_answer?.length).fill("")
  );

  // State to track which options are still draggable
  const [activeOptions, setActiveOptions] = useState<string[]>([
    ...(question.possible_answers || []),
  ]);

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
    const newAnswers = [...dndAnswers];
    const previousAnswer = newAnswers[index];
    newAnswers[index] = draggedOption;

    setDndAnswers(newAnswers);
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
    if (newActiveOptions.length === 0) {
      setCanProceed(true);
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [`${question.question_number}`]: newAnswers,
      }));
    }
  };

  const handleClear = () => {
    setActiveOptions([...(question.possible_answers || [])]);
    setDndAnswers(Array(question.possible_answers?.length).fill(""));
  };

  console.log("final dnd answer", dndAnswers);
  return (
    <>
      <div className="question">
        <Header1>{question.question_text}</Header1>
      </div>

      <div className="options">
        {question.possible_answers?.map((option, index) => (
          <div
            key={index}
            className={`option ${activeOptions.includes(`${option}`) ? "" : "inactive"}`}
            draggable={activeOptions.includes(`${option}`)}
            onDragStart={(e) => drag(e, `${option}`)}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="options answer-boxes">
        {dndAnswers.map((answer, index) => (
          <div
            key={index}
            id={`answer-box-${index}`}
            className={`option answer-box ${dndAnswers[index].trim() ? "drag-placed" : ""}`}
            onDrop={(e) => drop(e, index)}
            onDragOver={allowDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            {answer || ""}
          </div>
        ))}
      </div>
      <button className="btn-quiz-submit" onClick={handleClear}>
        CLEAR
      </button>
    </>
  );
}
