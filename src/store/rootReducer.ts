import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "../features/userDataSlice";
import userAnswersReducer from "../features/userAnswersDataSlice";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  userAnswers: userAnswersReducer,
});
