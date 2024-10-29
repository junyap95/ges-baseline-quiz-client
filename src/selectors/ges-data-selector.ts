import { GesAnswersDataState } from "../redux-data-slice/gesAnswersDataSlice";
import { GesRootState } from "../store/state";
import { Question } from "../utils/allQuizQuestions";

const selectProperty = <T extends keyof GesAnswersDataState>(state: GesRootState, property: T) => {
  return state.gesAnswers[property];
};

export const selectGesAnswersDataState = (state: GesRootState): GesAnswersDataState => {
  return state.gesAnswers;
};

export const selectCorrectCount = (state: GesRootState) => {
  return selectProperty(state, "correctCount");
};

export const selectQuesNum = (state: GesRootState) => {
  return selectProperty(state, "quesNum");
};

export const selectIsQuizTerminated = (state: GesRootState) => {
  return selectProperty(state, "isQuizTerminated");
};

export const selectCurrentLevel = (state: GesRootState) => {
  return selectProperty(state, "currentLevel");
};

export const selectIsCheckPoint = (state: GesRootState) => {
  return selectProperty(state, "isCheckPoint");
};

export const selectCurrentQuestion = (state: GesRootState) => {
  return selectProperty(state, "currentQuestion");
};

export const selectLevelLength = (state: GesRootState) => {
  return selectProperty(state, "levelLength");
};

export const selectUserAnswer = (state: GesRootState) => {
  const userAns = selectProperty(state, "allUserAnswers");
  const currentQues = selectProperty(state, "currentQuestion") as Question;
  return userAns[currentQues.question_number];
};

export const selectAllUserAnswers = (state: GesRootState) => {
  return selectProperty(state, "allUserAnswers");
};

export const selectTimeTakenArray = (state: GesRootState) => {
  return selectProperty(state, "timeSpent");
};
