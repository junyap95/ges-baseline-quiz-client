import { Question } from "./allQuizQuestions";
import { isEqual, isEmpty } from "lodash";

export const correctAnswerChecker = (
  question: Question,
  answer: string | string[] | { [key: string]: string | string[] }
) => {
  if (isEmpty(question)) {
    console.error({ message: "Error checking if answer is right." });
    return;
  }
  const { question_style, correct_answer } = question;
  switch (question_style) {
    case "multiple_choice_question":
      // In this case, both `answer` and `correctAnswer` should be strings
      return answer === correct_answer;
    case "drag_and_drop":
      return isEqual(answer, correct_answer);
    case "matching":
      return isEqual(answer, correct_answer);
    case "fill_in_the_blank":
      if (question.capitalisation) return isEqual(answer, correct_answer);
      const answerCapitalised = (answer as string[]).map((ans) => ans.toUpperCase());
      const correctAnswerCapitalised = (correct_answer as string[]).map((ans) => ans.toUpperCase());
      return isEqual(answerCapitalised, correctAnswerCapitalised);
    default:
      return false;
  }
};

export const resultTextDisplayer = (
  question: Question,
  answer: string | string[] | { [key: string]: string | string[] }
) => {
  const isAnswerCorrect = correctAnswerChecker(question, answer);
  const rightOrWrongText = isAnswerCorrect ? "RIGHT" : "WRONG";
  return isAnswerCorrect ? rightOrWrongText : `${rightOrWrongText}-${JSON.stringify(answer)}`;
};
