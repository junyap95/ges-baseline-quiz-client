import arrayEqual from "array-equal";

export const correctAnswerChecker = (
  questionStyle: string,
  answer: string | string[],
  correctAnswer: string | string[]
) => {
  switch (questionStyle) {
    case "multiple_choice_question":
      // In this case, both `answer` and `correctAnswer` should be strings
      return (
        typeof answer === "string" && typeof correctAnswer === "string" && answer === correctAnswer
      );
    case "drag_and_drop":
      // Ensure both `answer` and `correctAnswer` are arrays before comparing
      return (
        Array.isArray(answer) && Array.isArray(correctAnswer) && arrayEqual(answer, correctAnswer)
      );
    // case "matching":
    //   return <MatchingQuestion question={currentQuestion} />;
    // case "fill_in_the_blanks":
    //   return <FillInTheBlanksQuestion question={currentQuestion} />;
    default:
      return false;
  }
};
