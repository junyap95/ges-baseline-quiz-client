import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "../features/user-data/userDataSlice";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  // otherData: ...
});
