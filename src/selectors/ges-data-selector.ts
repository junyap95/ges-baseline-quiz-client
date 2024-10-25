import { GesAnswersDataState } from "../redux-data-slice/gesAnswersDataSlice";
import { GesRootState } from "../store/state";

const selectProperty = <T extends keyof GesAnswersDataState>(state: GesRootState, property: T) => {
  return state.gesAnswers[property];
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
