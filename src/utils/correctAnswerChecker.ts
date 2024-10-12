import arrayEqual from "array-equal";
import { Question } from "./allQuizQuestions";
import { isEqual } from "lodash";

export const correctAnswerChecker = (
  question: Question,
  answer: string | string[] | { [key: string]: string | string[] }
) => {
  const { question_style, correct_answer } = question;
  switch (question_style) {
    case "multiple_choice_question":
      // In this case, both `answer` and `correctAnswer` should be strings
      return answer === correct_answer;
    case "drag_and_drop":
      // Ensure both `answer` and `correct_answer` are arrays before comparing
      return Array.isArray(answer) && arrayEqual(answer, correct_answer);
    case "matching":
      return isEqual(answer, correct_answer);
    case "fill_in_the_blank":
      return Array.isArray(answer) ? isEqual(answer, correct_answer) : answer === correct_answer;

    default:
      return false;
  }
};

export const sheetAnswerChecker = (
  question: Question,
  answer: string | string[] | { [key: string]: string | string[] }
) => {
  return correctAnswerChecker(question, answer) ? "RIGHT" : "WRONG";
};
