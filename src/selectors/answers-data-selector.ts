import { UserAnswersDataState } from "../redux-data-slice/userAnswersDataSlice";
import { RootState } from "../store/state";

const selectProperty = <T extends keyof UserAnswersDataState>(state: RootState, property: T) => {
  return state.userAnswers[property];
};

export const selectCorrectCount = (state: RootState) => {
  return selectProperty(state, "correctCount");
};

export const selectQuesNum = (state: RootState) => {
  return selectProperty(state, "quesNum");
};

export const selectIsQuizTerminated = (state: RootState) => {
  return selectProperty(state, "isQuizTerminated");
};

export const selectCurrentLevel = (state: RootState) => {
  return selectProperty(state, "currentLevel");
};

export const selectIsCheckPoint = (state: RootState) => {
  return selectProperty(state, "isCheckPoint");
};
