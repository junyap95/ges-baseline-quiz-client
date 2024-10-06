import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "../features/userDataSlice";
import userAnswersReducer from "../features/userAnswersDataSlice";
import matchQuesReducer from "../features/matchQuesDataSlice";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  userAnswers: userAnswersReducer,
  matchQuesData: matchQuesReducer,
});
