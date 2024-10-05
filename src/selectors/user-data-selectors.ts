import { UserDataState } from "../features/userDataSlice";
import { RootState } from "../store/state";

const selectProperty = <T extends keyof UserDataState>(state: RootState, property: T) => {
  return state.userData[property];
};

export const selectUserName = (state: RootState) => {
  return selectProperty(state, "name");
};
