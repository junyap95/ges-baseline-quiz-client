import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PASSING_PERCENTAGE } from "../utils/constants";

export type Level = "level1" | "level2" | "level3";

export type UserAnswersDataState = {
  correctCount: number;
  currentLevel: Level;
  quesNum: number;
  isQuizTerminated: boolean;
  isCheckPoint: boolean;
};

const initialState: UserAnswersDataState = {
  correctCount: 0,
  currentLevel: "level1",
  quesNum: 0,
  isQuizTerminated: false,
  isCheckPoint: false,
};

interface UserAnswerPayload {
  userAnswer: string | string[] | { [key: string]: string };
  totalQuestions: number;
}

interface CheckPointPayload {
  isCheckPoint: boolean;
  isQuizTerminated: boolean;
}

const userAnswersDataSlice = createSlice({
  name: "userAnswersData",
  initialState,
  reducers: {
    userSubmitAnswer: (state: UserAnswersDataState, action: PayloadAction<UserAnswerPayload>) => {
      const { userAnswer, totalQuestions } = action.payload;
      let updatedCorrectCount = state.correctCount;

      if (userAnswer === "RIGHT") updatedCorrectCount++;

      if (state.quesNum + 1 < totalQuestions) {
        state.quesNum++;
        state.correctCount = updatedCorrectCount;
      } else {
        const correctPercentage = updatedCorrectCount / totalQuestions;
        if (correctPercentage >= PASSING_PERCENTAGE) {
          // Proceed to the next level if available
          if (state.currentLevel === "level1") {
            state.isCheckPoint = true;
            state.currentLevel = "level2";
          } else if (state.currentLevel === "level2") {
            state.isCheckPoint = true;
            state.currentLevel = "level3";
          } else {
            // Last level is completed successfully
            state.isQuizTerminated = true;
          }
        } else {
          // Terminate the quiz if the player did not pass
          state.isQuizTerminated = true;
        }
        state.quesNum = 0;
        state.correctCount = 0;
      }
    },

    setIsCheckPoint: (state: UserAnswersDataState, action: PayloadAction<CheckPointPayload>) => {
      const { isCheckPoint, isQuizTerminated } = action.payload;
      state.isCheckPoint = isCheckPoint;
      state.isQuizTerminated = isQuizTerminated;
    },
  },
});

export const { userSubmitAnswer, setIsCheckPoint } = userAnswersDataSlice.actions;
export default userAnswersDataSlice.reducer;
