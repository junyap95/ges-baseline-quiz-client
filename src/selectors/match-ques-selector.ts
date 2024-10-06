import { MatchingDataState } from "../features/matchQuesDataSlice";
import { RootState } from "../store/state";

const selectProperty = <T extends keyof MatchingDataState>(state: RootState, property: T) => {
  return state.matchQuesData[property];
};

export const selectOption = (state: RootState) => {
  return selectProperty(state, "option");
};

export const selectConnections = (state: RootState) => {
  return selectProperty(state, "connections");
};
