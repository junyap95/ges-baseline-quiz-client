import { SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DndType } from "../utils/allQuizQuestions";
import { Header1 } from "../utils/styledComponents";
import { tapAudio } from "../utils/audioManager";
import { shuffle } from "lodash";
import { useDispatch } from "react-redux";
import { userSetAnswer } from "../redux-data-slice/gesAnswersDataSlice";
import { resultTextDisplayer } from "../utils/correctAnswerChecker";
import { ClearButton } from "./question-stylesheets/MatchingStyles";
import { AnswerEl, OptionEl, Options } from "./question-stylesheets/DndStyles";

interface DragAndDropQuestionProps {
  question: DndType;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
  setAnswers: React.Dispatch<
    SetStateAction<{ [key: string]: string | string[] | { [key: string]: string } }>
  >;
}

export default function DndQuestion({
  question,
  setCanProceed,
  setAnswers,
}: DragAndDropQuestionProps) {
  const dispatch = useDispatch();
  const shuffledOptions = useMemo(() => shuffle(question.possible_answers), [question]);
  const optionRef = useRef<(HTMLDivElement | null)[]>([]);
  const [boxLoading, setBoxLoading] = useState(true);
  const [textBoxDim, setTextBoxDim] = useState({
    width: 0,
    height: 0,
  });

  // State to track answers for each answer box
  const [dndAnswers, setDndAnswers] = useState<string[]>(
    Array(question.correct_answer?.length).fill("")
  );
  // State to track which options are still draggable
  const [activeOptions, setActiveOptions] = useState<string[]>([
    ...(question.possible_answers || []),
  ]);

  const preventContextMenu = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };

  // Allow drop event
  const allowDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };

  // Handle touch move
  // const handleTouchMove = (ev: React.TouchEvent<HTMLDivElement>) => {
  //   ev.preventDefault(); // Prevent scrolling while dragging
  // };

  // Handle drag event
  const drag = useCallback(
    (ev: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, option: string) => {
      tapAudio.play();
      if (ev.type === "touchstart") {
        if ("vibrate" in navigator) {
          navigator.vibrate(50); // Vibrate for 50 milliseconds
        }
      }
      if (ev.nativeEvent instanceof DragEvent) {
        (ev as React.DragEvent<HTMLDivElement>)?.dataTransfer.setData("text", option);
      } else if (ev.nativeEvent instanceof TouchEvent) {
        (ev.target as HTMLElement).setAttribute("data-dragged-option", option); // Use data attribute for touch
      }
    },
    []
  );

  // Handle drag enter
  const handleDragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.currentTarget.classList.add("drag-over");
  };

  // Handle drag leave
  // const handleDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
  //   ev.currentTarget.classList.remove("drag-over");
  // };

  // Handle drop event for each answer box
  const drop = (ev: React.DragEvent<HTMLDivElement>, index: number) => {
    ev.preventDefault();
    ev.currentTarget.classList.remove("drag-over");
    tapAudio.play();

    let draggedOption = "";
    if (ev.nativeEvent instanceof DragEvent) {
      draggedOption = ev.dataTransfer?.getData("text") || "";
    } else {
      draggedOption = (ev.target as HTMLElement).getAttribute("data-dragged-option") || "";
    }

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
  };

  useEffect(() => {
    setCanProceed(false);
    if (!dndAnswers.some((ans) => ans === "")) {
      setCanProceed(true);
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [`${question.question_number}`]: resultTextDisplayer(question, dndAnswers),
      }));
      dispatch(userSetAnswer({ answer: dndAnswers, questionNum: question.question_number }));
    }
  }, [
    dispatch,
    dndAnswers,
    question,
    question.correct_answer.length,
    question.question_number,
    setAnswers,
    setCanProceed,
  ]);

  useEffect(() => {
    if (optionRef.current) {
      let currentMaxWidth = textBoxDim.width;
      let currentMaxHeight = textBoxDim.height;
      for (const w of optionRef.current) {
        const width = w?.getBoundingClientRect().width as number;
        const height = w?.getBoundingClientRect().height as number;
        if (width > currentMaxWidth) currentMaxWidth = width;
        if (height > currentMaxHeight) currentMaxHeight = height;
      }
      setTextBoxDim({
        width: currentMaxWidth,
        height: currentMaxHeight,
      });
      setBoxLoading(false);
    }
  }, [textBoxDim.height, textBoxDim.width]);

  const handleClear = () => {
    setActiveOptions([...(question.possible_answers || [])]);
    setDndAnswers(Array(question.possible_answers?.length).fill(""));
  };

  return (
    <>
      <div className="question">
        <Header1>{question.question_text}</Header1>
      </div>

      <Options>
        {shuffledOptions?.map((option, index) => (
          <OptionEl
            ref={(el) => (optionRef.current[index] = el)}
            key={index}
            draggable={activeOptions.includes(`${option}`)}
            onDragStart={(e) => drag(e, option)}
            onContextMenu={preventContextMenu}
            $isLoading={boxLoading || !activeOptions.includes(`${option}`)}
            $isPlaced={!!dndAnswers[index]?.trim()}
            $width={textBoxDim.width}
            $height={textBoxDim.height}
          >
            {option}
          </OptionEl>
        ))}
      </Options>

      <Options>
        {question.correct_answer.map((_, index) => (
          <AnswerEl
            $height={textBoxDim.height}
            $isLoading={boxLoading}
            $isPlaced={!!dndAnswers[index].trim()}
            $width={textBoxDim.width}
            key={index}
            id={`answer-box-${index}`}
            onDrop={(e) => drop(e, index)}
            onDragOver={allowDrop}
            onDragEnter={handleDragEnter}
            // onDragLeave={handleDragLeave}
          >
            {dndAnswers[index] || ""}
          </AnswerEl>
        ))}
      </Options>
      <ClearButton onClick={handleClear}>Clear</ClearButton>
    </>
  );
}
