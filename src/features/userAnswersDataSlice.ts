import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { correctAnswerChecker } from "../utils/correctAnswerChecker";
import { Question } from "../utils/allQuizQuestions";
import { PASSING_PERCENTAGE } from "../utils/constants";

export type Level = "level1" | "level2" | "level3";

export type UserAnswersDataState = {
  correctCount: number;
  currentLevel: Level;
  quesNum: number;
  isQuizTerminated: boolean;
};

const initialState: UserAnswersDataState = {
  correctCount: 0,
  currentLevel: "level1",
  quesNum: 0,
  isQuizTerminated: false,
};

interface UserAnswerPayload {
  userAnswer: string | string[] | { [key: string]: string };
  currentQuestion: Question;
  totalQuestions: number;
}

const userAnswersDataSlice = createSlice({
  name: "userAnswersData",
  initialState,
  reducers: {
    incrementCorrectCount: (state: UserAnswersDataState) => {
      state.correctCount += 1;
    },
    clearCorrectCount: (state: UserAnswersDataState) => {
      state.correctCount = 0;
    },

    userSubmitAnswer: (state: UserAnswersDataState, action: PayloadAction<UserAnswerPayload>) => {
      const { currentQuestion, userAnswer, totalQuestions } = action.payload;
      let updatedCorrectCount = state.correctCount;
      console.log("usersubmit", userAnswer);
      if (correctAnswerChecker(currentQuestion, userAnswer)) {
        updatedCorrectCount++;
      }
      if (state.quesNum + 1 < totalQuestions) {
        state.quesNum++;
        state.correctCount = updatedCorrectCount;
      } else {
        const correctPercentage = updatedCorrectCount / totalQuestions;
        console.log("mark?", correctPercentage);
        if (correctPercentage >= PASSING_PERCENTAGE) {
          // Proceed to the next level if available
          if (state.currentLevel === "level1") {
            state.currentLevel = "level2";
          } else if (state.currentLevel === "level2") {
            state.currentLevel = "level3";
          } else {
            // Last level is completed successfully
            console.log("Quiz completed successfully!");
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
  },
});

export const { incrementCorrectCount, clearCorrectCount, userSubmitAnswer } =
  userAnswersDataSlice.actions;
export default userAnswersDataSlice.reducer;
