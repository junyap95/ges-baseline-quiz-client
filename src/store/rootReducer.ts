import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "../redux-data-slice/userDataSlice";
import userAnswersReducer from "../redux-data-slice/userAnswersDataSlice";
import gesAnswersReduer from "../redux-data-slice/gesAnswersDataSlice";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  userAnswers: userAnswersReducer,
});

export const gesRootReducer = combineReducers({
  gesAnswers: gesAnswersReduer,
});
