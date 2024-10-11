import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "../redux-data-slice/userDataSlice";
import userAnswersReducer from "../redux-data-slice/userAnswersDataSlice";
import matchQuesReducer from "../redux-data-slice/matchQuesDataSlice";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  userAnswers: userAnswersReducer,
  matchQuesData: matchQuesReducer,
});
