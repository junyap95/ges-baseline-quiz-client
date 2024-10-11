import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "../redux-data-slice/userDataSlice";
import userAnswersReducer from "../redux-data-slice/userAnswersDataSlice";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  userAnswers: userAnswersReducer,
});
