import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "../features/user-data/userDataSlice";
import userAnswersReducer from "../features/user-data/userAnswersDataSlice";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  userAnswers: userAnswersReducer,
});
