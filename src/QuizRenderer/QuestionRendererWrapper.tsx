import { Question } from "../utils/allQuizQuestions";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import DndQuestion from "./DndQuestion";
import { SetStateAction } from "react";
import MatchingQuestion from "./MatchingQuestion";
import FillBlankQuestion from "./FillBlankQuestion";

export interface RenderQuestionArgs {
  currentQuestion: Question;
  setAnswers: React.Dispatch<
    SetStateAction<{ [key: string]: string | string[] | { [key: string]: string } }>
  >;
  canProceed: boolean;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

// Render the appropriate question style
export default function getQuestionRendererWrapper({
  currentQuestion,
  setAnswers,
  canProceed,
  setCanProceed,
}: RenderQuestionArgs) {
  switch (currentQuestion?.question_style) {
    case "multiple_choice_question":
      return (
        <MultipleChoiceQuestion
          question={currentQuestion}
          setAnswers={setAnswers}
          canProceed={canProceed}
          setCanProceed={setCanProceed}
          key={currentQuestion.question_number}
        />
      );
    case "drag_and_drop":
      return (
        <DndQuestion
          question={currentQuestion}
          setCanProceed={setCanProceed}
          setAnswers={setAnswers}
          key={currentQuestion.question_number}
        />
      );
    case "matching":
      return (
        <MatchingQuestion
          question={currentQuestion}
          setCanProceed={setCanProceed}
          setAnswers={setAnswers}
          key={currentQuestion.question_number}
        />
      );
    case "fill_in_the_blank":
      return (
        <FillBlankQuestion
          question={currentQuestion}
          setCanProceed={setCanProceed}
          setAnswers={setAnswers}
          key={currentQuestion.question_number}
          canProceed={false}
        />
      );
    default:
      return <div>Unknown question type</div>;
  }
}
