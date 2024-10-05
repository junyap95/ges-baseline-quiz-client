import { UserAnswersDataState } from "../features/userAnswersDataSlice";
import { RootState } from "../store/state";

const selectProperty = <T extends keyof UserAnswersDataState>(state: RootState, property: T) => {
  return state.userAnswers[property];
};

export const selectCorrectCount = (state: RootState) => {
  return selectProperty(state, "correctCount");
};
